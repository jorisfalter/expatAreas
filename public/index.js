(function () {
  const COLORS = { fill: "#e76f51", hover: "#0f4c5c", line: "#ffffff" };
  const VIEWS = {
    full: { center: [10.5, 30], zoom: 1.3 },
    mediterranean: { center: [12, 39.5], zoom: 3.4 },
    greece: { center: [24.3, 37.8], zoom: 5.2 },
    iberia: { center: [-6, 38.8], zoom: 4.8 },
    caribbean: { center: [-75, 17], zoom: 4 },
    southeastAsia: { center: [107, 2], zoom: 3.6 },
    scandinavia: { center: [17, 59], zoom: 4 },
  };

  const cards = Array.from(document.querySelectorAll(".card[data-slug]"));
  const names = {};
  cards.forEach((c) => (names[c.dataset.slug] = c.querySelector("h3").textContent));

  function store(get, k, v) {
    try {
      return get ? localStorage.getItem(k) : localStorage.setItem(k, v);
    } catch (e) {
      return null;
    }
  }

  const saved = store(true, "mapView");
  let start = VIEWS.mediterranean;
  try {
    if (saved) start = JSON.parse(saved);
  } catch (e) {}

  const map = new maplibregl.Map({
    container: "map",
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: start.center,
    zoom: start.zoom,
    cooperativeGestures: window.matchMedia("(pointer: coarse)").matches,
    attributionControl: { compact: true },
  });
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

  map.on("moveend", () => {
    const c = map.getCenter();
    store(false, "mapView", JSON.stringify({ center: [c.lng, c.lat], zoom: map.getZoom() }));
  });

  let hovered = null;
  function setHover(slug) {
    if (hovered === slug) return;
    if (hovered && map.getSource("regions")) map.setFeatureState({ source: "regions", id: hovered }, { hover: false });
    hovered = slug;
    if (slug && map.getSource("regions")) map.setFeatureState({ source: "regions", id: slug }, { hover: true });
  }

  const tooltip = document.getElementById("tooltip");

  Promise.all([
    fetch("/regions.json").then((r) => r.json()),
    new Promise((res) => (map.loaded() ? res() : map.on("load", res))),
  ]).then(([data]) => {
    const features = Object.entries(data)
      .filter(([slug]) => names[slug])
      .map(([slug, f]) => ({ ...f, properties: { slug, name: names[slug] } }));

    map.addSource("regions", {
      type: "geojson",
      data: { type: "FeatureCollection", features },
      promoteId: "slug",
    });
    map.addLayer({
      id: "regions-fill",
      type: "fill",
      source: "regions",
      paint: {
        "fill-color": ["case", ["boolean", ["feature-state", "hover"], false], COLORS.hover, COLORS.fill],
        "fill-opacity": 0.55,
      },
    });
    map.addLayer({
      id: "regions-line",
      type: "line",
      source: "regions",
      paint: { "line-color": COLORS.line, "line-width": 1.5 },
    });

    map.on("mousemove", "regions-fill", (e) => {
      const f = e.features[0];
      map.getCanvas().style.cursor = "pointer";
      setHover(f.id);
      tooltip.textContent = f.properties.name;
      tooltip.style.left = e.point.x + "px";
      tooltip.style.top = e.point.y + "px";
      tooltip.classList.add("show");
    });
    map.on("mouseleave", "regions-fill", () => {
      map.getCanvas().style.cursor = "";
      setHover(null);
      tooltip.classList.remove("show");
    });
    map.on("click", "regions-fill", (e) => {
      window.location.href = "/" + e.features[0].properties.slug;
    });

    cards.forEach((c) => {
      c.addEventListener("mouseenter", () => setHover(c.dataset.slug));
      c.addEventListener("mouseleave", () => setHover(null));
    });
  });

  function activate(group, btn) {
    group.querySelectorAll(".chip").forEach((b) => b.classList.toggle("is-active", b === btn));
  }

  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activate(btn.parentElement, btn);
      map.flyTo({ ...VIEWS[btn.dataset.view], essential: true });
    });
  });

  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activate(btn.parentElement, btn);
      const f = btn.dataset.filter;
      cards.forEach((c) => (c.hidden = f !== "all" && c.dataset.area !== f));
    });
  });
})();
