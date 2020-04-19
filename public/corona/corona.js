function setup(){
    noCanvas();
    const submit = document.getElementById('submitbut');
    submit.addEventListener('click', async event =>{
        console.log('hi');
        const data = {country: 'ES'};
        const options = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        };

        const url = "/corona";
        const res = await fetch(url, options);
        const resjson = await res.json();
        console.log(resjson);

        // Show data in client
        const countryDiv = document.createElement('p');
        countryDiv.innerHTML = 
            `<ul>
                <li>Pais: ${resjson.data.name}</li>
                <li>Població: ${resjson.data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                <li>Actualizat en: ${resjson.data.updated_at}</li>
            </ul>`;
        const todayDiv = document.createElement('p');
        todayDiv.innerHTML = 
            `<p4>Avui</p4><ul>
                <li>Morts: ${resjson.data.today.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                <li>Confirmats: ${resjson.data.today.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
            </ul>`;
            const totalsDiv = document.createElement('p');
            totalsDiv.innerHTML = 
                `<p4>Totals</p4><ul>
                    <li>Morts: ${resjson.data.latest_data.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                    <li>Confirmats: ${resjson.data.latest_data.confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                    <li>Recuperats: ${resjson.data.latest_data.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                    <li>Critics: ${resjson.data.latest_data.critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</li>
                </ul>`;
        const results = document.getElementById('results');
        results.append(countryDiv, todayDiv, totalsDiv);

    });
}