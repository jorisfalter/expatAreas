const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // udemy class 248 15 minutes

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.render("index", {});
});

// I assume we don't need this
// app.post("/", function (req, res) {});

const cities = require("./data/regionsContent.json");
// console.log("log1: " + cities["engadinSanktMoritz"]);

// to check if regionsContent is still correct
// const testRegionsContent = require("./data/regionsContent.json");
// console.log(testRegionsContent);

app.get("/:cityName", (req, res) => {
  // let cityNameLower = req.params.cityName.toLowerCase();
  let cityNameLower = req.params.cityName;
  // console.log(cityNameLower);
  // console.log(cities[cityNameLower]);
  if (cities[cityNameLower]) {
    res.render("locationPage", {
      city: cities[cityNameLower],
    });
  } else {
    res.status(404).send("City not found");
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("listening");
});
