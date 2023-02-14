const fetchCategories = async () => {
    try {
        let response = await fetch( "https://simple-room-leaves-api.vercel.app/api/categories")
        return await response.json();
    } catch (err) {
        console.log("Error: " + err)
    }
}


const loadCategories = (categories) => {
    const containerElement = document.getElementById('categoriesWrapper');
    // Rellenar los elementos de la página con los datos de categorias.
    categories.forEach(category => {
        console.log(category)
        // MAIN CATEGORY WRAPPER
        element = document.createElement("article");
        element.classList.add("category-container");
        element.style.background = 'rgba(0,0,0,.7)';

        // CATEGORY WRAPPER
        cWEl = document.createElement("div");
        cWEl.classList.add("category-wrapper");

        // CATEGORY DATA
        cDataEl = document.createElement("div");
        cDataEl.classList.add("category-data");

        // CATEGORY IMAGE
        cImageEl = document.createElement("div");
        cImageEl.classList.add("category-image");

        // TITLE
        cTitle = document.createElement("h3");
        cTitle.classList.add("category-title");
        cTitle.textContent = category.name.charAt(0).toUpperCase() + category.name.slice(1);

        // DESCRIPTION
        cDesc = document.createElement("p");
        cDesc.classList.add("category-description");
        cDesc.textContent = category.description;

        // PICTURE
        cPicEl = document.createElement("picture");
        cImgEl = document.createElement("img");
        cImgEl.classList.add("img");
        cImgEl.height = "150";
        cImgEl.width = "160";
        cImgEl.alt = category.name + " plant image";
        cImgEl.src = 'assets/' + category.name.toLowerCase() + '-category.png';

        // APPENDING
        // Data
        cDataEl.appendChild(cTitle);
        cDataEl.appendChild(cDesc);

        // Image
        cPicEl.appendChild(cImgEl);
        cImageEl.appendChild(cPicEl);

        element.appendChild(cWEl);
        cWEl.appendChild(cDataEl);
        cWEl.appendChild(cImageEl);

        containerElement.appendChild(element);
    });
    
    // document.getElementById('plantName').textContent = plant.name ?? '';
    // document.getElementById('plantPrice').textContent = plant.price ?? '';
    // document.getElementById('plantStock').textContent = (plant.stock  ?? '') + ' plants left in stock';
    // document.getElementById('plantAboutTitle').textContent = 'About ' + plant.name ?? '';
    // document.getElementById('plantDescription').textContent = plant.description ?? '';
    // document.getElementById('plantHeight').textContent = (plant.height ?? '') * 100 + 'cm';
    // document.getElementById('plantHumidity').textContent = plant.humidity ?? '' + '%' ;
    // document.getElementById('plantTemperature').textContent = (plant.temperature ?? '') + 'ºC';
    // document.getElementById('plantImage').src = "../public/plants/plant_" + plant.name.toLowerCase().split(" ").join("") + ".png";
}

async function main() {
    let plant = await fetchCategories();
    loadCategories(plant);
}

main();