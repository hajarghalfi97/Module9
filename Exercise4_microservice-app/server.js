// This exercise will look very different for each student due to so many different APIs. 
// Main goal is to understand how to set up routes and controllers,
// if possible to extend/adapt the functionality of the external API
// using dynamic and query params to customise requests.

const express = require("express");
const app = express();

require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my Weather MicroService application." });
});

let weatherRoutes = require("./routes/weatherRoutes");
app.use("/api/weather", weatherRoutes); 

// set port, listen for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
