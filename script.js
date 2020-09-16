$(document).ready(function () {
  console.log("Hello world");

  // variables from the html page elements
  var searchInputEl = $("#search-input");
  var searchBtn = $("#search-btn");
  var mainForecastEl = $("#main-forecast");
  var subForecastEl = $("#five-day-forecast");

  var singleTruth = [];
 // weather app API KEY: cc00bc76b8b458cb3c1c74e38a95cf97 
 // API call by city name: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

 // on click, we want to dynamically populate the main forecast and five day forecast 

 searchBtn.on("click", function(){
// save user input to localStorage and populate new button of previous searches
singleTruth.push(searchInputEl.val());
localStorage.setItem("city", JSON.stringify(singleTruth));
$("#city-list").empty();
// retrieve local storage city input and dynamically generate buttons below the search button
var populatedCity = JSON.parse(localStorage.getItem("city"));
for (var i = 0; i < populatedCity.length; i++){
console.log(populatedCity);
var searchCityBtn = $("<button>");
searchCityBtn.text(populatedCity[i]);
$("#city-list").prepend(searchCityBtn);
}

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
  
 var currentMoment = (moment().format("DD/MM/YYYY"));
  // now we populate the main forecast El with these values 
  var mainWeatherDiv = $("<div>");
  mainForecastEl.append(mainWeatherDiv);
  // create the main city title for the element
  var todayCity = $("<h3>");
  todayCity.text(searchInputEl.val() + "  " + currentMoment);
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
// use a for loop to dynamically generate the 5 day forecast
for (var i = 1; i < 6; i++) {
// retrieve the 5 day forecast weather data 

// get the forecast kelvinTemp and calculate F
var subKelvinTemp = result.list[i].main.temp;
var subNewTemp = Math.round((( subKelvinTemp - 273.15) * 9/5) + 32);
console.log("Temperature: " + subNewTemp);
//grab the humidity level for the 5 day forecast 
var subHumidity = result.list[i].main.humidity;
console.log("humidity level: " + subHumidity + "%");
// generate the next 5 dates to be logged in the forecast 
var futureDays = (moment().add(i, 'days').format("DD/MM/YYYY"));
console.log(futureDays);
//dynamically create the 5 day forecast div and include the new values 
    var emptyEl = $("<div>");
    emptyEl.addClass("test");
    subForecastEl.append(emptyEl);

    var nextDay = $("<h6>");
    nextDay.text(futureDays);
    emptyEl.append(nextDay);

    var titleTemp = $("<h5>");
    titleTemp.text("Temperature: " + subNewTemp + "F");
    emptyEl.append(titleTemp);

    var subHumidityEl = $("<h5>");
    subHumidityEl.text("Humidity: " + subHumidity + "%");
    emptyEl.append(subHumidityEl);
}

})

});

function clearFunction(){

}
 
});
