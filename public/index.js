//// This is the public Mapbox code >> change to one specific for this
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9yaXNib3JpcyIsImEiOiJjbG1lam95ZWQxeXhjM2ZteGY2NDhqY2ltIn0.UnfVT_V85n8-D4IN7lxcnA";

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

// map.on("load", function () {
//   // Add a new source from our GeoJSON data
//   map.addSource("algarve", {
//     type: "geojson",
//     data: algarveGeoJSON,
//   });
//   // Add a new layer to visualize the polygon.
//   map.addLayer({
//     id: "algarve-layer",
//     type: "fill",
//     source: "algarve", // reference the data source
//     layout: {},
//     paint: {
//       "fill-color": "#0000FF", // yellow color
//       "fill-opacity": 0.6,
//     },
//   });

//   // When the user moves their mouse over the Algarve layer, we'll update the tooltip to display
//   map.on("mouseenter", "algarve-layer", function (e) {
//     // Change the cursor style as a UI indicator.
//     map.getCanvas().style.cursor = "pointer";

//     // Populate and display the tooltip. We'll use the coordinates of the mouse position.
//     var coordinates = e.lngLat;
//     var description =
//       "Cost of living: medium<br>Population: 500,000 inhabitants<br>Population in high season: <br>Average population age: 45<br>Avg hottest month temp: 29 degrees celsius<br>Avg coldest month temp: 16.7 degrees celsius<br>Number of international schools: 13";
//     // Ensure that if the map is zoomed out such that multiple copies of the feature are visible,
//     // the tooltip appears over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates.lng) > 180) {
//       coordinates.lng += e.lngLat.lng > coordinates.lng ? 360 : -360;
//     }

//     // Set the tooltip content and display it
//     var tooltip = document.getElementById("tooltip");
//     tooltip.innerHTML = description;
//     tooltip.style.display = "block";
//     tooltip.style.left = e.point.x + "px";
//     tooltip.style.top = e.point.y + "px";
//   });

//   // Create a mouseout event that hides the tooltip when the user's mouse leaves the layer.
//   map.on("mouseleave", "algarve-layer", function () {
//     map.getCanvas().style.cursor = "";
//     var tooltip = document.getElementById("tooltip");
//     tooltip.style.display = "none";
//   });
// });

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
