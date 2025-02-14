// Initialiserer Leaflet-kartet og setter utgangspunktet
const map = L.map('map').setView([20, 0], 2);

// Legger til OpenStreetMap-fliser som bakgrunn
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> bidragsytere'
}).addTo(map);

// Definerer et nytt hjerteikon med fast rød farge
const heartIcon = L.icon({
  iconUrl:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjkuNiIgdmlld0JveD0iMCAwIDMyIDI5LjYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE2IDE5LjYgTDEyLjIgMTYuOCA5LjIgMTMuMSBDNi40IDExLjMgNSAxMC4zIDUgNy41IEM1IDQuNyA2LjQgMy43IDEwLjIgMy43IEMxMy45IDMuNyAxNyAyLjcgMTkuOCA0LjNDMjIuNCA2LjkgMjQgOS43IDI0LjkgMTIuMSBMMjUuMiAxMi43TDEyIDI5LjYgOS41IDE4LjQgNy4zIDE1LjEgQzQuNyAxMi43IDMgMTAuNyAzIDcuNSBDMyA0LjMgNC43IDMuMyA3LjMgMy4zIEMxMC43IDMuMyAxNC4xIDQuMyAxNiAxNyBMOC43IDEwLjdDOS43IDkuNyAxMyA4LjMgMTYgMTAuNyBMNi41IDE5LjYgTDE2IDE5LjYiIGZpbGw9IiNlNjAwNzMiLz48L3N2Zz4=',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

/**
 * Oppdaterte steder med støtte for flere bilder og litt mer humoristiske meldinger.
 */
const locations = [
  {
    name: "Danmark",
    coords: [55.6761, 12.5683],
    message: "Danmark: Danskebåt og kjøretur--den siste turen var slitsom! Men verdt det!",
    images: ["images/danmark.jpg"]
  },
  {
    name: "Riga, Latvia",
    coords: [56.9496, 24.1052],
    message: "Riga, Latvia: For en fantastisk tur! Jeg må ærlig innrømme at skytabanen var litt skummel!",
    images: ["images/riga.jpg"]
  },
  {
    name: "Shanghai",
    coords: [31.2304, 121.4737],
    message:
      "Shanghai: Så sykt kult at jeg fikk bli med til kina og møte familien din!",
    images: ["images/shanghai.jpg"]
  },
  {
    name: "Chang De",
    coords: [29.0391, 111.6390],
    message:
      "Chang De: Våre minner her lyser opp natten som byens neonlys – så hyggelig å møte familien din!",
    images: ["images/changde.jpg"]
  },
  {
    name: "Changsha",
    coords: [28.2282, 112.9388],
    message:
      "Changsha: Hvert hjerteslag minner meg om hvor unik du er – skikkelig Cyberpunk!",
    images: ["images/changsha.jpg"]
  },
  {
    name: "New York",
    coords: [40.7128, -74.0060],
    message:
      "New York: Der selv skyhøye bygninger, jeg fikk skikkelig vondt i nakken!",
    images: ["images/newyork1.jpg", "images/newyork2.jpg"]
  },
  {
    name: "Los Angeles",
    coords: [34.0522, -118.2437],
    message:
      "Los Angeles: Sol, strender og en dose glamour – akkurat som du får meg til å føle!",
    images: ["images/losangeles.jpg"]
  },
  {
    name: "Las Vegas",
    coords: [36.1699, -115.1398],
    message:
      "Las Vegas: Her satser jeg alt på deg – du er min uventede jackpot!",
    images: ["images/lasvegas.jpg"]
  },
  {
    name: "Grand Canyon",
    coords: [36.1069, -112.1129],
    message:
      "Grand Canyon: Dypere enn mine dårligste vitser, men din tiltrekning er ekte!",
    images: ["images/grandcanyon.jpg"]
  },
  {
    name: "Antalya",
    coords: [36.8969, 30.7133],
    message: "Antalya: Sol, hav og kanskje litt for varmt – jeg glemmer aldri majestetiske Mount Olympic!",
    images: ["images/antalya.jpg"]
  },
  {
    name: "Madeira",
    coords: [32.6669, -16.9241],
    message:
      "Madeira: var helt fantastisk sammen med deg, så mye vi fikk oppleve!",
    images: ["images/madeira.jpg"]
  },
  {
    name: "Nessebar",
    coords: [42.6684, 27.6762],
    message:
      "Nessebar: utrolig digg med all inclusive i bulgaria, og ølen vi tok første kvelden var sykt digg",
    images: ["images/nessebar.jpg"]
  },
  {
    name: "Hurghada",
    coords: [27.2579, 33.8116],
    message:
      "Hurghada: Sol, sand og ATV eventyr!",
    images: ["images/hurghada.jpg"]
  },
  {
    name: "Kairo",
    coords: [30.0444, 31.2357],
    message:
      "Kairo: magisk å se pyramidene sammen med eg prinsesseChen",
    images: ["images/cairo.jpg"]
  },
  // Nye Oslo-hjem
  {
    name: "Bogerud",
    coords: [59.87, 10.90],
    message: "Bogerud: Vårt billigste hjem.",
    images: ["images/oslohjem1.jpg"]
  },
  {
    name: "Ensjø",
    coords: [59.92, 10.85],
    message: "Ensjø: Vårt første kjøp sammen.",
    images: ["images/oslohjem2.jpg"]
  },
  {
    name: "Oslo - Ny leilighet",
    coords: [59.91, 10.75],
    message: "Oslo: Vår nyeste og dyreste leilighet.",
    images: ["images/oslohjem3.jpg"]
  },
  // Ny USA-markør
  {
    name: "USA",
    coords: [39.8283, -98.5795],
    message:
      "USA: turen er den sykeste opplevelsen i mitt liv, tusen takk elsklingKIRI for å ha planlagt den!!!",
    images: ["images/usa.jpg"]
  }
];

// Legger til markører for hvert sted og bygger popup med bilder (slider hvis flere bilder)
locations.forEach(location => {
  const marker = L.marker(location.coords, { icon: heartIcon }).addTo(map);

  let popupHTML = `
    <div class="popup-content">
      <strong>${location.name}</strong><br>
      ${location.message}
  `;

  if (location.images && location.images.length > 0) {
    let baseImage = location.images[0];
    const match = baseImage.match(/(.*?)(\d*)\.jpg$/);
    if (match) {
      const baseWithoutNumber = match[1];
      const numberPart = match[2];
      if (numberPart === "") {
        popupHTML += `<div class="slider">
          <div class="slides">
            <div class="slide active">
              <img src="${baseImage}" alt="${location.name}" 
                onerror="this.onerror=null; this.src='${baseWithoutNumber}1.jpg';" />
            </div>`;
        for (let i = 2; i <= 4; i++) {
          popupHTML += `<div class="slide">
              <img src="${baseWithoutNumber}${i}.jpg" alt="${location.name}" 
                onerror="this.style.display='none';" />
            </div>`;
        }
        popupHTML += `</div>
            <button class="prev">&#10094;</button>
            <button class="next">&#10095;</button>
          </div>`;
      } else {
        popupHTML += `<img src="${location.images[0]}" alt="${location.name}" />`;
      }
    } else {
      popupHTML += `<img src="${location.images[0]}" alt="${location.name}" />`;
    }
  }

  popupHTML += `</div>`;
  marker.bindPopup(popupHTML);
});

// ──────────────────────────────────────────
// Slider initialization for popup images
// ──────────────────────────────────────────
function initSlider(sliderElement) {
  const slides = sliderElement.querySelectorAll('.slide');
  let currentIndex = 0;
  const nextButton = sliderElement.querySelector('.next');
  const prevButton = sliderElement.querySelector('.prev');

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = (i === index) ? 'block' : 'none';
    });
  }

  showSlide(currentIndex);

  nextButton.addEventListener('click', function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  prevButton.addEventListener('click', function(e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
}

// Initialize slider when a popup is opened
map.on('popupopen', function(e) {
  const popupNode = e.popup.getElement();
  const slider = popupNode.querySelector('.slider');
  if (slider) {
    initSlider(slider);
  }
});

// ──────────────────────────────────────────
// Animasjon med fly som beveger seg fra sted til sted
// ──────────────────────────────────────────

const airplaneIcon = L.icon({
  iconUrl: 'images/loveBirds.jpg',
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25]
});

let airplaneMarker = L.marker(locations[0].coords, { icon: airplaneIcon }).addTo(map);

function animateMarker(marker, startLatLng, endLatLng, duration, callback) {
  const startTime = performance.now();
  function animate(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    const currentLat = startLatLng[0] + (endLatLng[0] - startLatLng[0]) * progress;
    const currentLng = startLatLng[1] + (endLatLng[1] - startLatLng[1]) * progress;
    marker.setLatLng([currentLat, currentLng]);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else if (callback) {
      callback();
    }
  }
  requestAnimationFrame(animate);
}

function animateAirplane(route, index = 0) {
  const nextIndex = (index + 1) % route.length;
  const start = route[index].coords;
  const end = route[nextIndex].coords;
  animateMarker(airplaneMarker, start, end, 3000, () => {
    setTimeout(() => {
      animateAirplane(route, nextIndex);
    }, 1000);
  });
}

animateAirplane(locations);
