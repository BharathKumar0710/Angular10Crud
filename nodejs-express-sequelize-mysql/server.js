const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./app/routes/turorial.routes")(app);
// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome"
  });
});

// drop existing tables and re - sync database
const db = require("./app/models");
db.sequelize.sync({
  force: true
}).then(() => {
  console.log("Drop and re-sync db.");
});
