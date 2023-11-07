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
        [-8.995264387023342, 37.52613001504033],
        [-8.995264387023342, 37.027291043969406],
        [-7.513023249060555, 37.027291043969406],
        [-7.513023249060555, 37.52613001504033],
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
      "fill-color": "#0000FF", // yellow color
      "fill-opacity": 0.6,
    },
  });
});
