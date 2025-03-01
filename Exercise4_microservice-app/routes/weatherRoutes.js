const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

// matches GET requests like /api/weather/Sydney
router.get('/:city', (req, res) => {
    weatherController.getCityWeather(req, res);
})

// matches GET requests like /api/weather/forecast/Sydney
router.get('/forecast/:city', (req, res) => {
    weatherController.getCityForecast(req, res);
})

module.exports = router;