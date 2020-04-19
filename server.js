const clientspos = [] ;

console.log('Server says: Hi there!');

const express = require('express');
const fs = require('fs');
const datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const db = new datastore('paligru.db');     
db.loadDatabase();

const port = process.env.PORT || 3000;

app.listen(3000, ()=> console.log('Server says: Listening at 3000'))
app.use(express.static('public'));
app.use(express.json({limit:"1mb"}));

app.get('/api', (request, response)=>{      
    db.find({}, (err, data)=>{            
        for (i=0;i<data.length;i++){
            let img64 = fs.readFileSync(data[i].image64);
           
            //console.log('img64' + img64);
            data[i].image64 = 'data:image/png;base64,' + img64.toString('base64');                
            //console.log(data[i].image64);
        }
        if (err) console.log('GET DB Error:' + err);
        response.json(data);
    });
    
});
// ENDPOINT #1 - Selfies
app.post('/api', (request, response)=>{    
    response.json({message: 'Pali-server says: data received'});
    // Save data    
    const outImage = request.body.image64.replace(/^data:image\/png;base64,/, '');
    const imagefilename = `images/img_${Date.now()}.png`; 
    fs.writeFile(imagefilename, outImage, 'base64', err=> {
        if (err) {
            // there was an error
            console.log(err);
        } else {
            // data written successfully
            console.log("file written successfully");
        }
      });

    request.body.timestamp = Date.now();
    request.body.image64 = imagefilename;
    db.insert(request.body);
    // Show data
    //clientspos.push(request.body);
    //clientspos.forEach((pos, i) =>console.log('-' + pos.lat + ' ' + i));
});

// ENDPOINT #2 - Coronavirus
app.post('/corona', async (request, response)=>{    
    //getData(request.body.country).then(data =>{
    //    response.json(data);
    //})
    //.catch(err=>{console.log(err)});

    const url = "https://corona-api.com/countries/" + request.body.country;
    console.log(url);
    const res = await fetch(url);
    const resjson = await res.json();
    response.json(resjson);

});

async function getData(pcountry){
    const url = "https://corona-api.com/countries/" + pcountry;
    console.log(url);
    const res = await fetch(url);
    const resjson = await res.json();
    return resjson;
}
