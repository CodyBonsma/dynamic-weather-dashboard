$(document).ready(function () {
  console.log("Hello world");

  // variables from the html page elements
  var searchInputEl = $("#search-input");
  var searchBtn = $("#search-btn");
  var mainForecastEl = $("#main-forecast");
  var subForecastEl = $("#five-day-forecast");

 // weather app API KEY: cc00bc76b8b458cb3c1c74e38a95cf97 
 // API call by city name: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

 // on click, we want to dynamically populate the main forecast and five day forecast 
 searchBtn.on("click", function(){
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.val() + "&appid=cc00bc76b8b458cb3c1c74e38a95cf97";

 $.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response.main.temp);
  // get the Kelvin temperature from the api and set it to Fahrenheit 
  var kelvinTemp = response.main.temp;
  var newTemp = Math.round((( kelvinTemp - 273.15) * 9/5) + 32);
  console.log("Temperature: " + newTemp);
  // now get the humidity from the data and set that to a variable
  var humidity = response.main.humidity;
  console.log("humidity: " + humidity);
 // we get the windspeed value from the data and set it to a value 
  var windSpeed = response.wind.speed;
  console.log("windspeed: " + windSpeed);
  

  // now we populate the main forecast El with these values 
  var mainWeatherDiv = $("<div>");
  mainForecastEl.append(mainWeatherDiv);
  // create the main city title for the element
  var todayCity = $("<h3>");
  todayCity.text(searchInputEl.val());
  mainWeatherDiv.append(todayCity);
  // today's temperature 
  var todayTemp = $("<h5>");
  todayTemp.text("Temperature: " + newTemp + "F");
  mainWeatherDiv.append(todayTemp);
  // today's humidity 
  var todayHumidity = $("<h5>");
  todayHumidity.text("Humidity: " + humidity + "%");
  mainWeatherDiv.append(todayHumidity);
  // today's wind speed
  var todayWind = $("<h5>");
  todayWind.text("Wind Speed: " + windSpeed + "MPH");
  mainWeatherDiv.append(todayWind);

});
// bring in the new api link for the 5 day forecast 
var query5URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInputEl.val() + "&appid=cc00bc76b8b458cb3c1c74e38a95cf97";

$.ajax({
 url: query5URL,
 method: "GET",
}).then(function (result) {
console.log(result);
})


 });
 
  for (var i = 0; i < 5; i++) {
    var emptyEl = $("<div>");
    emptyEl.addClass("test");
    subForecastEl.append(emptyEl);

    var titleTemp = $("<h5>");
    titleTemp.text("placeholder");
    emptyEl.append(titleTemp);

    var titleCity = $("<p>");
    titleCity.text("city");
    emptyEl.append(titleCity);
  }

 
});
