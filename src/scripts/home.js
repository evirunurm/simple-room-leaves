
const fetchPlants = async () => {
    try {
        let response = await fetch( "https://simple-room-leaves-api.vercel.app/api/plants")
        return await response.json();
    } catch (err) {
        console.log("Error: " + err)
    }
}


const loadLatestPlants = (plants) => {
    console.log(plants)
    const latestElement = document.getElementById('carousel-img-container');
    let element;

    plants.forEach(plant => {
        element = document.createElement("div");
        element.classList.add("PlantImage");

        imgEl = document.createElement("img");
        imgEl.src = "../public/plants/plant_" + plant.name.toLowerCase().split(" ").join("") + ".png";

        aEl = document.createElement("a");
        aEl.classList.add("overlay");
        aEl.href = '/src/products.html?id=' + plant.id;

        element.appendChild(aEl);
        element.appendChild(imgEl);
        latestElement.appendChild(element);

    });

}


async function main() {
    let recentPlants = await fetchPlants();
    // Llamar a la carga del "Latest" element
    loadLatestPlants(recentPlants);
}


main();