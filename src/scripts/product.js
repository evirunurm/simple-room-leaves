const fetchPlant = async () => {
    try {
        // Obtener el URL de la página
        const queryString = window.location.search;
        // Sacar el ID de los parametros 
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get("id");

        let response = await fetch( "https://simple-room-leaves-api.vercel.app/api/plants?id=" + id)
        return await response.json();
    } catch (err) {
        console.log("Error: " + err)
    }
}


const loadPlant = (plant) => {
    // Rellenar los elementos de la página con los datos, teniendo en cuenta que alguna puede venir en blanco.
    document.getElementById('plantName').textContent = plant.name ?? '';
    document.getElementById('plantPrice').textContent = plant.price ?? '';
    document.getElementById('plantStock').textContent = (plant.stock  ?? '') + ' plants left in stock';
    document.getElementById('plantAboutTitle').textContent = 'About ' + plant.name ?? '';
    document.getElementById('plantDescription').textContent = plant.description ?? '';
    document.getElementById('plantHeight').textContent = (plant.height ?? '') * 100 + 'cm';
    document.getElementById('plantHumidity').textContent = plant.humidity ?? '' + '%' ;
    document.getElementById('plantTemperature').textContent = (plant.temperature ?? '') + 'ºC';
    document.getElementById('plantImage').src = "../public/plants/plant_" + plant.name.toLowerCase().split(" ").join("") + ".png";
}

async function main() {
    let plant = await fetchPlant();
    loadPlant(plant);
}

main();