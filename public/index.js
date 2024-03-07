//// This is the public Mapbox code >> change to one specific for this
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9yaXNib3JpcyIsImEiOiJjbG93aTdpb2cwNjBxMmptb2YyMXIxY2kwIn0.lHB4wVJZ8uNndWlXrzzVFw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/jorisboris/clmdk27ll01bw01qx24l12bnw",
  center: [10.549316, 39.986836],
  zoom: 3,
});

map.on("moveend", function () {
  var center = map.getCenter();
  var zoom = map.getZoom();

  // Store center latitude and longitude
  localStorage.setItem("mapCenterLat", center.lat);
  localStorage.setItem("mapCenterLng", center.lng);
  localStorage.setItem("mapZoom", zoom);
});

if (
  localStorage.getItem("mapCenterLat") &&
  localStorage.getItem("mapCenterLng") &&
  localStorage.getItem("mapZoom")
) {
  var lat = localStorage.getItem("mapCenterLat");
  var lng = localStorage.getItem("mapCenterLng");
  var zoom = localStorage.getItem("mapZoom");

  map.setCenter([lng, lat]);
  map.setZoom(zoom);
}

// Function to load GeoJSON data from a file
function loadGeoJSON(url) {
  console.log("we're in the loadGeoJson function");
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log("Error loading the GeoJSON data:", error));
}

// function to add layers
function addLayersToMap(regionsData) {
  console.log("we're in the 'on load' function");
  // Add source and layer for each region
  Object.entries(regionsData).forEach(([regionId, geojsonData]) => {
    if (!map.getSource(regionId)) {
      map.addSource(regionId, { type: "geojson", data: geojsonData });
    }
    // Add the fill layer
    map.addLayer({
      id: `${regionId}-layer`,
      type: "fill",
      source: regionId,
      paint: { "fill-color": "#0000FF", "fill-opacity": 0.6 },
    });
    // Add the line layer for border
    map.addLayer({
      id: `${regionId}-border`,
      type: "line",
      source: regionId,
      layout: {},
      paint: {
        "line-color": "#000000", // Black color for the border
        "line-width": 1, // Width of the border line
      },
    });

    // Add click event listener for the layer
    map.on("click", `${regionId}-layer`, function () {
      // Redirect to the URL
      window.location.href = `/${regionId}`;
    });

    // Change the cursor to a pointer when the mouse is over the layer.
    map.on("mouseenter", `${regionId}-layer`, function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", `${regionId}-layer`, function () {
      map.getCanvas().style.cursor = "";
    });

    // Add mouseenter event for each layer
    map.on("mouseenter", `${regionId}-layer`, function (e) {
      map.getCanvas().style.cursor = "pointer";
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
}

loadGeoJSON("regions.json").then((regionsData) => {
  console.log("we're gonna wait until map is loaded now");
  if (map.loaded()) {
    // map already loaded
    addLayersToMap(regionsData);
  } else {
    map.on("load", function () {
      addLayersToMap(regionsData);
    });
  }
});

//////////////// TOP FILTERS
// Coordinates and zoom levels for each region for the filters on top
const locations = {
  full: {
    center: [10.54, 39.98],
    zoom: 1,
  },
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
document.querySelector(".full-button").addEventListener("click", function () {
  flyToRegion("full");
});

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
