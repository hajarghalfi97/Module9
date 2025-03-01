"use strict";
const axios = require('axios')

// matches GET requests like /api/weather/Sydney and returns weather JSON from API
// supports a 'units' query parameter, default is metric (temps in C). eg. /api/weather/Sydney?units=imperial (temps in F) or /api/weather/Sydney?units=standard (temps in K)
const getCityWeather = (req, res) => {
    // destructure the city from request params, default to Sydney if not supplied
    const { city = 'Sydney' } = req.params;

    // destructure the units from request query, default to metric if not supplied
    const { units = 'metric' } = req.query;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?APPID=0c2e3284fcc8a15f0f039eba6a9703c1&q=${city}&units=${units}`).then(data => {
        console.log(data.data); 
        res.status(200).json({ data: data.data }) 
    }).catch(err => {
        res.status(500).json({ data: err.message }) 
    })
}

// matches GET requests like /api/weather/forecast/Sydney and returns weather forecasts for next 5 days from API
// supports a 'units' query parameter, default is metric (temps in C). eg. /api/weather/forecast/Sydney?units=imperial (temps in F) or /api/weather/forecast/Sydney?units=standard (temps in K)
// supports a 'dailyForecasts' query parameter, default is 1. eg. /api/weather/forecast/Sydney?dailyForecasts=2 (2 forecasts per day)
// supports a 'days' query parameter, default is 5. eg. /api/weather/forecast/Sydney?days=3 (forecasts for next 3 days) 5 is max.
const getCityForecast = (req, res) => {
    // destructure the city from request params, default to Sydney if not supplied
    const { city = 'Sydney' } = req.params;

    // destructure the units and daily forecast count from request query, default to metric and 1 if not supplied
    const { units = 'metric', dailyForecasts = '1', days = '5' } = req.query;
    let dayCount = 0;

    // query gets a 3-hourly forecast for the next 5 days = 5 * (24/3) = 40 forecasts - we don't want this many
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?APPID=0c2e3284fcc8a15f0f039eba6a9703c1&q=${city}&units=${units}`).then(data => {
        console.log(data.data); 
        const forecasts = data.data.list;
        const groupedForecasts = forecasts.reduce((acc, forecast) => {
            const date = forecast.dt_txt.split(' ')[0]; // Extract date from the timestamp
          
            // Check if the date is already in the accumulator
            if (!acc[date]) {
                dayCount++;
                if (dayCount <= days) acc[date] = [];
            }
            if (dayCount <= days && acc[date].length < dailyForecasts) acc[date].push(forecast); // If not, add the forecast for that date
          
            return acc;
        }, {});

        // replace the original full list of forecasts with our grouped/filtered list
        data.data.list = groupedForecasts;

        res.status(200).json({ data: data.data }) 
    }).catch(err => {
        res.status(500).json({ data: err.message }) 
    })
}

module.exports = {
    getCityWeather, getCityForecast
}