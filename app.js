const express = require("express");
const content = require("./data/regionsContent.json");

const SITE_URL = process.env.SITE_URL || "https://expatareas.ai-tigers.com";
const AREAS = [
  "Southern Europe",
  "Caribbean & Central America",
  "Southeast Asia",
  "Northern Europe & Alps",
];

// Only real destinations (skip template/test entries).
const regions = Object.entries(content)
  .filter(([, r]) => r && r.name && r.area)
  .map(([slug, r]) => ({ slug, ...r }))
  .sort((a, b) => a.name.localeCompare(b.name));
const bySlug = new Map(regions.map((r) => [r.slug.toLowerCase(), r]));

// Fields rendered as their own section on a destination page.
const KNOWN = new Set(["pic", "picowner", "why", "whyNot", "reviews"]);
const SECTIONS = [
  ["communities", "Communities", "👪"],
  ["schools", "Schools", "🎒"],
  ["weather", "Weather", "☀️"],
  ["population", "Population", "🏘️"],
  ["walkability", "Walkability", "🚶"],
  ["usefulLinks", "Useful links", "🔗"],
];
SECTIONS.forEach(([k]) => KNOWN.add(k));

function stripHtml(s) {
  return String(s || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

// Loose extra fields (e.g. nested "Weather": {...}) become key facts.
function keyFacts(props) {
  const facts = [];
  const walk = (obj) => {
    for (const [k, v] of Object.entries(obj)) {
      if (v && typeof v === "object") walk(v);
      else if (String(v).trim()) facts.push([k, String(v)]);
    }
  };
  for (const [k, v] of Object.entries(props)) {
    if (KNOWN.has(k)) continue;
    if (v && typeof v === "object") walk(v);
    else if (String(v).trim()) facts.push([k, String(v)]);
  }
  return facts;
}

const app = express();
app.set("view engine", "ejs");
app.disable("x-powered-by");
app.use(express.static("public", { maxAge: "7d" }));
app.locals.siteUrl = SITE_URL;

app.get("/", (req, res) => {
  res.render("index", { regions, areas: AREAS });
});

app.get("/robots.txt", (req, res) => {
  res.type("text/plain").send(`User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
});

app.get("/sitemap.xml", (req, res) => {
  const urls = ["/", ...regions.map((r) => `/${r.slug}`)]
    .map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`)
    .join("\n");
  res
    .type("application/xml")
    .send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
});

app.get("/:cityName", (req, res) => {
  const city = bySlug.get(req.params.cityName.toLowerCase());
  if (!city) {
    return res.status(404).render("notFound", { regions });
  }
  if (req.params.cityName !== city.slug) {
    return res.redirect(301, `/${city.slug}`);
  }
  const p = city.properties;
  const sections = SECTIONS.filter(([k]) => typeof p[k] === "string" && p[k].trim());
  const related = regions
    .filter((r) => r.area === city.area && r.slug !== city.slug)
    .slice(0, 3);
  res.render("locationPage", {
    city,
    sections,
    facts: keyFacts(p),
    related,
    description: stripHtml(p.why).slice(0, 155),
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("listening");
});
