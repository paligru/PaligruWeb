function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(200,160);		
    video.position(50,250);
    const button = document.getElementById('submitbut');
    button.addEventListener('click', async event =>{
        if ('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(async position=>{
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            //document.getElementById('latitude').innerText = lat.toFixed(2);
            //document.getElementById('longitude').innerText = lon.toFixed(2);
            const name = document.getElementById('name').value;
            video.loadPixels();
            const image64 = video.canvas.toDataURL();
            // Send data
            
            const data = { lat, lon, name, image64};
            const options = {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            };
            
            const resdata = await fetch('/api', options);
            const resjson = await resdata.json();
            console.log(resjson);
            
        });
    } else {
        console.log('Geolocation unavailable!');
    }
    });
}