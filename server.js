const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
var port = process.env.PORT || 3000;
const apiKey = 'b0adfc47029160c2fa915551e3fbab4a';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
	  let weatherText = `Weather in ${weather.name}:  \n Temperature in Celsius : ${(weather.main.temp-32)*0.5556} °C || Temperature in Fahrenheit:  ${weather.main.temp} °F || Wind speed is ${weather.wind.speed} !`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(port, ()=> {
  console.log(`Server starting working at ${port}`);
})