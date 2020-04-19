getData();	
async function getData(){
    const res = await fetch('/api');
    const resdata = await res.json();		
    for (item of resdata){
        //console.log(item);
        const root = document.createElement('p');
        const lat = document.createElement('div');
        const lon = document.createElement('div');
        const nam = document.createElement('div');
        const pic = document.createElement('img');
        
        lat.textContent = `Lat: ${item.lat}`;					
        lon.textContent = `Lon: ${item.lon}`;					
        nam.textContent = `Lon: ${item.name}`;	
        pic.src = item.image64;	
        pic.alt="Paligru Selfis";
        //console.log(item.image64);
        root.append(lat, lon, nam, pic);
        document.getElementById('main').append(root);
    }
    
}