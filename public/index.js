//// This is the public Mapbox code >> change to one specific for this
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9yaXNib3JpcyIsImEiOiJjbG93aTdpb2cwNjBxMmptb2YyMXIxY2kwIn0.lHB4wVJZ8uNndWlXrzzVFw";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/jorisboris/clmdk27ll01bw01qx24l12bnw",
  center: [10.549316, 39.986836],
  zoom: 3,
});

const algarveGeoJSON = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      // Replace with the actual coordinates for the Algarve region
      [
        [-8.995264387023342, 37.52613001504033],
        [-8.995264387023342, 37.027291043969406],
        [-7.513023249060555, 37.027291043969406],
        [-7.513023249060555, 37.52613001504033],
        [-8.995264387023342, 37.52613001504033],
      ],
    ],
  },
};

const tenerifeGeoJSON = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      // Replace with the actual coordinates for the Algarve region
      [
        [-17.25, 28.75],
        [-16, 28.75],
        [-16, 28],
        [-17.25, 28],
        [-17.25, 28.75],
      ],
    ],
  },
};

const regions = [
  {
    id: "algarve",
    geojson: algarveGeoJSON,
    tooltipContent:
      "Cost of living: medium<br>Population: 500,000 inhabitants<br>Population in high season: <br>Average population age: 45<br>Avg hottest month temp: 29 degrees celsius<br>Avg coldest month temp: 16.7 degrees celsius<br>Number of international schools: 13",

    // ... other properties
  },
  {
    id: "tenerife",
    geojson: tenerifeGeoJSON, // Replace with Tenerife's GeoJSON
    tooltipContent: "Tenerife tooltip content...",
    // ... other properties
  },
  // ... Add more regions
];

map.on("load", function () {
  regions.forEach((region) => {
    // Add source for each region
    map.addSource(region.id, {
      type: "geojson",
      data: region.geojson,
    });

    // Add layer for each region
    map.addLayer({
      id: `${region.id}-layer`,
      type: "fill",
      source: region.id,
      paint: {
        "fill-color": "#0000FF",
        "fill-opacity": 0.6,
      },
    });

    // Add mouseenter event for each layer
    map.on("mouseenter", `${region.id}-layer`, function (e) {
      map.getCanvas().style.cursor = "pointer";
      var coordinates = e.lngLat;
      var tooltip = document.getElementById("tooltip");
      tooltip.innerHTML = region.tooltipContent;
      tooltip.style.display = "block";
      tooltip.style.left = e.point.x + "px";
      tooltip.style.top = e.point.y + "px";
    });

    // Add mouseleave event for each layer
    map.on("mouseleave", `${region.id}-layer`, function () {
      map.getCanvas().style.cursor = "";
      var tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";
    });
  });
});

//////////////// TOP FILTERS
// Coordinates and zoom levels for each region for the filters on top
const locations = {
  europe: {
    center: [10.549316, 39.986836],
    zoom: 3,
  },
  caribbean: {
    center: [-75.3412, 18.0425],
    zoom: 4,
  },
  southeastAsia: {
    center: [104.1954, 11.576],
    zoom: 3,
  },
  greece: {
    center: [24.277831, 38.693123],
    zoom: 4.8,
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
