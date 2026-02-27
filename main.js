let keywords = [
    "Analog Front-End Design",
    "Functional Verification",
    "CHERI Hardware Security",
    "Embedded Systems",
    "SoC Implementation",
    "RF & mm-Wave Design",
    "Mixed-Signal Integration",
    "Power Management IC (PMIC)",
    "UVM-based environments",
    "Hardware-Software Co-Design",
    "Strategic Silicon Solutions",
    "Turnkey ASIC Solutions",
    "Functional Safety (ISO 26262)"
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


function initSecurePhone() {
    document.querySelectorAll('.phone-secure').forEach(el => {
        const p1 = el.getAttribute('data-p1');
        const p2 = el.getAttribute('data-p2');
        const p3 = el.getAttribute('data-p3');
        const p4 = el.getAttribute('data-p4');
        if (p1 && p2 && p3 && p4) {
            const tel = `+${p1}${p2}${p3}${p4}`;
            const display = `+${p1} ${p2} ${p3} ${p4}`;
            el.href = `tel:${tel}`;
            el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> ${display}`;
            el.classList.add('active');
        }
    });
}

function initMap() {
    const mapElement = document.getElementById('map-background');
    if (!mapElement) return;

    // Responsive centering
    const getMapCenter = () => {
        return window.innerWidth <= 1024
            ? [48, 15] // Centered for Mobile/Tablet
            : [48, 45]; // Shifted East for Desktop (clears right text)
    };

    const map = L.map('map-background', {
        center: getMapCenter(),
        zoom: 4,
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: false
    });

    // Tech-themed Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {}).addTo(map);

    const locations = [
        { name: 'Bucharest, Romania (HQ)', coords: [44.4268, 26.1025], isHQ: true },
        { name: 'Sofia, Bulgaria', coords: [42.6977, 23.3219] },
        { name: 'Vienna, Austria', coords: [48.2082, 16.3738] },
        { name: 'Budapest, Hungary', coords: [47.4979, 19.0402] },
        { name: 'Milan, Italy', coords: [45.4642, 9.1900] },
        { name: 'Istanbul, Turkey', coords: [41.0082, 28.9784] },
        { name: 'Cambridge, UK', coords: [52.2053, 0.1218] }
    ];

    const bucharestIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pulse active"></div>',
        iconSize: [20, 20]
    });

    const standardIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div class="marker-pulse"></div>',
        iconSize: [20, 20]
    });

    locations.forEach(loc => {
        L.marker(loc.coords, { icon: loc.isHQ ? bucharestIcon : standardIcon })
            .addTo(map)
            .bindPopup(`<strong>${loc.name}</strong>`);
    });

    // Re-center on window resize
    window.addEventListener('resize', () => {
        map.setView(getMapCenter(), 4);
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.header-nav a');

    if (!menuToggle || !navMenu || !navOverlay) return;

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createLayers();
    setInterval(morphText, 3000);
    initSecurePhone();
    initMap();
    initMobileMenu();
});
