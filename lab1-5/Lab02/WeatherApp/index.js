const express = require("express");
const hbs = require('hbs');
const fetch = require('node-fetch');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


const port = 3000;

app.get('/weather(/:city?)', async (req, res) => {
    let city = req.params.city;
    if(!city) {
        city = req.query.city;
    }
    if(!city) {
        res.render('400')
        return;
    }
    
    let key = '31ad2c354460b8f64fff0ad6e111ae67';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    let response = await fetch(url);
    let weather = await response.json();

    res.render('weather.hbs', {city, weather})
});

app.listen(port, () => {
    console.log(`http://localhost:${port}/weather/?city=`);
})

/*
const express = require("express");
let app = express();
const port = 3000;

app.get('/', (req, res) => { 
    res.send("Hello")
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
}) */