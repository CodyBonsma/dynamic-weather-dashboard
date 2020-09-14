$(document).ready(function () {
  console.log("Hello world");

  var searchInputEl = $("#search-input");
  var searchBtn = $("#search-btn");
  var mainForecastEl = $("#main-forecast");
  var subForecastEl = $("#five-day-forecast");

 // weather app API KEY: cc00bc76b8b458cb3c1c74e38a95cf97 
 // API call by city name: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

 searchBtn.on("click", function(){
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.val() + "&appid=cc00bc76b8b458cb3c1c74e38a95cf97"

 $.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);


// for(var i = 0; response.data.length; i++){
//   // var imageEl = $("<img>");
//   // $("body").append(imageEl);
//   // imageEl.attr("src", response.data[i].images.original.url);
// }
 console.log(response);

  // imageEl.text(response.)
});
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
