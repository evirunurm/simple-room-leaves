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
    document.getElementById('plantName').textContent = plant.name;
    document.getElementById('plantPrice').textContent = plant.price + '€';
    document.getElementById('plantAboutTitle').textContent = 'About ' + plant.name;
    document.getElementById('plantDescription').textContent = plant.description;
    document.getElementById('plantHeight').textContent = plant.height * 100 + 'cm';
}

async function main() {
    let plant = await fetchPlant();
    loadPlant(plant);
}

main();