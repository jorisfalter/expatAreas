//// This is the public Mapbox code >> change to one specific for this
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9yaXNib3JpcyIsImEiOiJjbG93aTdpb2cwNjBxMmptb2YyMXIxY2kwIn0.lHB4wVJZ8uNndWlXrzzVFw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/jorisboris/clmdk27ll01bw01qx24l12bnw",
  center: [10.549316, 39.986836],
  zoom: 3,
});

// Function to load GeoJSON data from a file
function loadGeoJSON(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log("Error loading the GeoJSON data:", error));
}

loadGeoJSON("regions.json").then((regionsData) => {
  map.on("load", function () {
    // Add source and layer for each region
    Object.entries(regionsData).forEach(([regionId, geojsonData]) => {
      map.addSource(regionId, { type: "geojson", data: geojsonData });
      map.addLayer({
        id: `${regionId}-layer`,
        type: "fill",
        source: regionId,
        paint: { "fill-color": "#0000FF", "fill-opacity": 0.6 },
      });

      // Add mouseenter event for each layer
      map.on("mouseenter", `${regionId}-layer`, function (e) {
        map.getCanvas().style.cursor = "pointer";
        var coordinates = e.lngLat;
        var tooltip = document.getElementById("tooltip");
        var tooltipContent = document.getElementById("regionDescription");
        tooltipContent.innerHTML = e.features[0].properties.tooltipContent;
        tooltip.style.display = "block";
        // Get the mouse pointer's coordinates on the page
        var mouseX = e.originalEvent.clientX;
        var mouseY = e.originalEvent.clientY;
        tooltip.style.left = mouseX + "px";
        tooltip.style.top = mouseY + "px";
      });

      // Add mouseleave event for each layer
      map.on("mouseleave", `${regionId}-layer`, function () {
        map.getCanvas().style.cursor = "";
        var tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
      });
    });
  });
});

//////////////// TOP FILTERS
// Coordinates and zoom levels for each region for the filters on top
const locations = {
  europe: {
    center: [10.54, 39.98],
    zoom: 3,
  },
  caribbean: {
    center: [-75.34, 18.04],
    zoom: 4,
  },
  southeastAsia: {
    center: [104.19, 0.97],
    zoom: 3.5,
  },
  greece: {
    center: [24.27, 38.69],
    zoom: 4.8,
  },
  iberia: {
    center: [-4.42, 39.79],
    zoom: 4.8,
  },
  scandinavia: {
    center: [15.35, 58.73],
    zoom: 4,
  },
};

// Function to fly to a specific region
function flyToRegion(region) {
  if (locations[region]) {
    map.flyTo({
      center: locations[region].center,
      zoom: locations[region].zoom,
      essential: true,
    });
  }
}

// Attaching event listeners using querySelector
document.querySelector(".europe-button").addEventListener("click", function () {
  flyToRegion("europe");
});

document
  .querySelector(".caribbean-button")
  .addEventListener("click", function () {
    flyToRegion("caribbean");
  });

document
  .querySelector(".south-east-asia-button")
  .addEventListener("click", function () {
    flyToRegion("southeastAsia");
  });

document.querySelector(".greece-button").addEventListener("click", function () {
  flyToRegion("greece");
});

document.querySelector(".iberia-button").addEventListener("click", function () {
  flyToRegion("iberia");
});

document
  .querySelector(".scandinavia-button")
  .addEventListener("click", function () {
    flyToRegion("scandinavia");
  });
