

let plants;

function refreshPriceFilter(event) {
    const valueEl = document.getElementById('priceValue');
    valueEl.textContent = event.target.value + "€"
}

function refreshHeightFilter(event) {
    const valueEl = document.getElementById('heightValue');
    valueEl.textContent = event.target.value + "cm"
}

function filterSelected(categories) {
    categories = Array.from(categories);
    return categories.filter(category => category.checked);
}


const fetchPlants = async () => {
    try {
        let response = await fetch( "https://simple-room-leaves-api.vercel.app/api/plants")
        return await response.json();
    } catch (err) {
        console.log("Error: " + err)
    }
}

const fetchCategories = async () => {
    try {
        let response = await fetch( "https://simple-room-leaves-api.vercel.app/api/categories")
        return await response.json();
    } catch (err) {
        console.log("Error: " + err)
    }
}

function filter() {
    // GET THE VALUES
    const price = parseInt(document.getElementById('price').value.toLowerCase());
    const height = parseInt(document.getElementById('height').value.toLowerCase());
    const sortBy = document.getElementById('sortBy').value.toLowerCase();
    let categories = document.getElementsByClassName('filteredCategory');
    categories = filterSelected(categories);

    // FILTER
    plants = plants.filter(plant => {
        return plant.price <= price 
        && plant.height <= height
        && categories.some((category) => category.id == plant.categoryId)
    })
    
    // ORDER PLANTS
    if (sortBy) {
        plants.sort( (plant1, plant2) => plant2[sortBy] - plant1[sortBy])
    }

    // PRINT PLANTS
    loadAllPlants(plants);
}


const loadAllPlants = (plants) => {
    const latestElement = document.getElementById('productsWrapper');
    // Clearing the element containing all the plants.
    latestElement.innerHTML = "";
    let element;
    let imgEl;
    let aEl;
    let pEl;

    plants.forEach(plant => {
        element = document.createElement("div");
        element.classList.add("PlantImage");
        element.classList.add("plant-image");

        imgEl = document.createElement("img");
        imgEl.classList.add("img");
        imgEl.alt = plant.name
        // SACAR EL NOMBRE DE LA PLANTA JUNTO.
        imgEl.src = "../public/plants/plant_" + plant.name.toLowerCase().split(" ").join("") + ".png";

        aEl = document.createElement("a");

        // Generar detalle de la planta
        aEl.innerHTML = plant.name 
        + "</br>" 
        + plant.price + "€" 
        + "</br>" 
        + '<span class="stock-text">' + plant.stock + " plants left </span>"
        aEl.classList.add("overlay");
        aEl.href = '/src/product.html?id=' + plant.id;

        pEl = document.createElement("p");
        pEl.textContent = "Hello"

        element.appendChild(aEl);
        element.appendChild(imgEl);
        element.appendChild(pEl);
        latestElement.appendChild(element);

    });
}

const loadCategories = (categories) => {
    const categoriesElement = document.getElementById('categories');
    let element;
    let label;
    let input;

    categories.forEach(category => {

        element = document.createElement("div");

        label = document.createElement("label");
        label.for = category.name;
        label.textContent = category.name[0].toUpperCase() + category.name.substring(1);

        input = document.createElement("input");
        input.name = category.name;
        input.classList.add("filteredCategory");
        input.id = category.id;
        input.type="checkbox";
        input.checked = true;

        label.appendChild(input);
        element.appendChild(label);
        categoriesElement.appendChild(element);

    });
}


async function main() {
    plants = await fetchPlants();
    let categories = await fetchCategories();

    // Llamar a la carga del "Latest" element
    loadAllPlants(plants);
    loadCategories(categories);
}


main();