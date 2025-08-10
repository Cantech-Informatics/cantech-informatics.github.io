let keywords = [
    "Compiler Engineering",
    "Architectural & Performance Modelling",
    "CHERI (Capability Hardware Enhanced RISC Instructions)",
    "Embedded Systems",
    "Analog IC Layout",
    "Analog Design",
    "Digital Design and Verification",
    "Formal Verification",
    "FPGA Fabric",
    "SRAM Memory Design",
    "Digital Physical Design",
    "Turnkey ASIC solutions"
];

const morphingTextDiv = document.getElementById('morphing-text');
let currentKeywordIndex = 0;
let layers = [];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function createLayers() {
    morphingTextDiv.innerHTML = '';
    layers = [];

    shuffleArray(keywords).forEach((keyword, index) => {
        const textLayer = document.createElement('div');
        textLayer.classList.add('text-layer');
        textLayer.textContent = keyword;
        if (index === 0) {
            textLayer.classList.add('active');
        }
        morphingTextDiv.appendChild(textLayer);
        layers.push(textLayer);
    });
}

function morphText() {
    const currentLayer = layers[currentKeywordIndex];
    const nextKeywordIndex = (currentKeywordIndex + 1) % layers.length;
    const nextLayer = layers[nextKeywordIndex];

    if (currentLayer) {
        currentLayer.classList.remove('active');
        currentLayer.classList.add('previous');
    }

    if (nextLayer) {
        nextLayer.classList.remove('previous');
        nextLayer.classList.add('active');
    }


    setTimeout(() => {
        if(currentLayer) {
            currentLayer.classList.remove('previous');
        }
    }, 500);

    currentKeywordIndex = nextKeywordIndex;
}


createLayers();
setInterval(morphText, 3000);
