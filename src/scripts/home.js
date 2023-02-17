// CONSTANTS
const maxAmount = 4;

const fetchPlants = async () => {
    try {
        let response = await fetch( "https://simple-room-leaves-api.vercel.app/api/plants")
        return (await response.json()).slice(0, maxAmount);
    } catch (err) {
        console.log("Error: " + err)
    }
}

const fetchSummary = async () => {
    try {
        let response = await fetch( "https://simple-room-leaves-api.vercel.app/api/summary")
        return (await response.json());
    } catch (err) {
        console.log("Error: " + err)
    }
}


const loadLatestPlants = (plants) => {
    const latestElement = document.getElementById('carousel-img-container');
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

const loadLatestSummary = (days) => {
    const summaryElement = document.getElementById('summaryContainer');
    let element;
    let maxSells = Math.max.apply(Math, days.map(function(day) { return day.sells; }));

    days.forEach(day => {
        // ASIGNAR VALORES DINAMICOS AL BAR
        barEl = document.createElement("div");
        barEl.classList.add("bar");
        barEl.classList.add("bar" + day.date);
        barEl.style.height = (day.sells * 100) / maxSells + "%"

        // METER EL :BEFORE DE MANERA DINAMICA
        let style = document.createElement("style");
        style.innerHTML =
        `.${"bar" + day.date}:after {
            content: '${day.sells} sells';
            position: absolute;
            top: -20px;
            color: black;
            width: 60px;
            left: 50%;
            transform: translate(-50%); /* PARA QUE SE CENTRE */
        }
        .${"bar" + day.date}:before {
            content: '${day.date}';
            position: absolute;
            bottom: 0;
            font-size: 0.5rem;
            color: white;
            width: 60px;
            left: 22%;
        }
        `;

        document.head.appendChild(style);
        summaryElement.appendChild(barEl);
    });

   

}

async function main() {
    let recentPlants = await fetchPlants();
    let summary = await fetchSummary();

    // Llamar a la carga del "Latest" element
    loadLatestPlants(recentPlants);
    // Llamar a la carga del summary
    loadLatestSummary(summary);
}




main();