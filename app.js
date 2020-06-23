const express = require('express');
const https = require("https");
const ejs = require('ejs');
const bodyparser = require("body-parser");
const dateToday = require('./dateToday.js');
const app = express();


app.use(express.static('Public'));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  var today = dateToday.theDate();
  res.render('opening',{Date:today});

 });

app.post("/", function(requ,resp) {
  var city = requ.body.cityName;
  const APIkey = "80ae610495c08ce7d0c6e74ebaa56a73";
  const APIUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + APIkey;

  var weatherStuff = https.get(APIUrl, function(response) {

   response.on("data", function(data) {

     const weatherdata = JSON.parse(data);
     const temp = weatherdata.main.temp;
     const desc = weatherdata.weather[0].description;
     const icon = weatherdata.weather[0].icon;
     const humidity = weatherdata.main.humidity;
     const feels_like = weatherdata.main.feels_like;
     const cityname = weatherdata.name;
     const country = weatherdata.sys.country;
     const imgUrl = "https://openweathermap.org/img/wn/" +icon+ "@2x.png";

     var date = new Date();
     var today = date.toLocaleDateString('en-US',{weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'});
 

     resp.render('weatherStruc',{theCity:cityname,imgsrc:imgUrl,Date:today,degrees:temp,descrip:desc,humi:humidity,feels:feels_like,countryCode:country});

    });
  });
});

app.listen(3000);


//is <%=temperature%>
