// productsWrapper

const fetchPlants = async () => {
    try {
        let response = await fetch( "https://simple-room-leaves-api.vercel.app/api/plants")
        return await response.json();
    } catch (err) {
        console.log("Error: " + err)
    }
}


const loadAllPlants = (plants) => {
    console.log(plants)
    const latestElement = document.getElementById('productsWrapper');
    let element;

    plants.forEach(plant => {
        element = document.createElement("div");
        element.classList.add("PlantImage");
        element.classList.add("plant-image");

        imgEl = document.createElement("img");
        imgEl.classList.add("img");
        imgEl.src = "../public/plants/plant_" + plant.name.toLowerCase().split(" ").join("") + ".png";

        aEl = document.createElement("a");
        aEl.classList.add("overlay");
        aEl.href = '/src/product.html?id=' + plant.id;

        element.appendChild(aEl);
        element.appendChild(imgEl);
        latestElement.appendChild(element);

    });

}


async function main() {
    let recentPlants = await fetchPlants();
    // Llamar a la carga del "Latest" element
    loadAllPlants(recentPlants);
}


main();