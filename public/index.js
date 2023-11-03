//// This is the public Mapbox code >> change to one specific for this
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9yaXNib3JpcyIsImEiOiJjbG1lam95ZWQxeXhjM2ZteGY2NDhqY2ltIn0.UnfVT_V85n8-D4IN7lxcnA";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/jorisboris/clmdk27ll01bw01qx24l12bnw",
  center: [-8.229492, 37.192198],
  zoom: 8,
});

const algarveGeoJSON = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      // Replace with the actual coordinates for the Algarve region
      [
        [-9.498047, 37.016219], // Southwest near Sagres
        [-8.916016, 37.020098], // Aljezur coast
        [-8.674805, 37.084107], // Odeceixe coast
        [-8.459473, 37.134045], // Near Lagos
        [-8.317383, 37.152924], // Portimao
        [-8.229492, 37.192198], // Near Lagoa
        [-8.157593, 37.1739], // Albufeira
        [-7.844727, 37.015175], // Near Faro
        [-7.756836, 37.034965], // Near Olhão
        [-7.690918, 37.029688], // Near Tavira
        [-7.558838, 37.055177], // Vila Real de Santo António

        // [-7.426758, 37.177825], // Inland towards Alcoutim
        // [-7.624023, 37.216078], // North inland
        // [-8.031738, 37.257449], // North inland
        // [-8.063721, 37.22158], // West inland near Silves
        // [-8.349609, 37.265309], // North inland
        // [-8.624512, 37.309014], // More to the west inland
        // [-8.811279, 37.282795], // Further west inland
        // [-8.998047, 37.249885], // North of Sagres inland
        // [-9.184814, 37.152924], // Approaching the west coast again
        // [-9.206787, 37.108918], // Close to the coastline again
        // [-9.311157, 37.084107], // Near Cabo de São Vicente

        [-7.389969, 38.196701], // Starting from the northeast end
        [-7.435608, 38.167642],
        [-7.478546, 38.138528],
        [-7.526505, 38.115257],
        [-7.570129, 38.087171],
        [-7.618774, 38.061039],
        [-7.663086, 38.039759],
        [-7.710678, 38.01257],
        [-7.76001, 37.991211],
        [-7.811035, 37.961758],
        [-7.85968, 37.926195],
        [-7.912598, 37.898056],
        [-7.987183, 37.870824],
        [-8.050049, 37.848637],
        [-8.106674, 37.826389],
        [-8.183502, 37.783168],
        [-8.26239, 37.75953],
        [-8.360107, 37.715462],
        [-8.437622, 37.68382],
        [-8.659424, 37.65213], // Ending at the southwest end

        [-9.498047, 37.016219], // Closing the loop back at the southwest corner
      ],
    ],
  },
};

map.on("load", function () {
  // Add a new source from our GeoJSON data
  map.addSource("algarve", {
    type: "geojson",
    data: algarveGeoJSON,
  });

  // Add a new layer to visualize the polygon.
  map.addLayer({
    id: "algarve-layer",
    type: "fill",
    source: "algarve", // reference the data source
    layout: {},
    paint: {
      "fill-color": "#FFFF00", // yellow color
      "fill-opacity": 0.6,
    },
  });
});
