const mymap = L.map('selfismap').setView([51.505, -0.09], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(mymap);

getData();

async function getData(){
    const res = await fetch('/api');
    const resjson = await res.json();
    console.log(resjson);

    for (item of resjson){
        // Add marker
        const marker = L.marker([item.lat, item.lon]).addTo(mymap);
        const markertxt = `Name: ${item.name}`;
        marker.bindPopup(markertxt);
    }
}