$(document).ready(function(){

  // Current Conditions API
  var urlCurrent = "http://api.wunderground.com/api/0774b434e8a6f2aa/conditions/q/DC/Washington.json"
  $.ajax ({
    url: urlCurrent,
    type: "get",
    dataType: "json"
  }).done(function(response){
    var currentCity = response.current_observation.display_location.full
    var currentWeatherTemp = Math.round(response.current_observation.temp_f)
    var currentWeatherConditions =  response.current_observation.icon
    $("#conditions").append("<h2>" + currentWeatherTemp + "&deg;F</h2>", "<span class=" + currentWeatherConditions + "></span>")
    $(".container").addClass("container__" + currentWeatherConditions)
    $(".weather__image").addClass("weather__image--" + currentWeatherConditions)
    $("#city").append(currentCity)
    if (currentWeatherTemp < 40) {
      $(".weather__image").addClass("weather__image--snow")
    }
  }).fail(function(err){
    console.log("Error: " + err.status)
  }).always(function(){
    console.log("Greeeeeaaaaat, it like waaaahrked wowarked woorked")
  })

  //Forecast API
  var url = "http://api.wunderground.com/api/0774b434e8a6f2aa/forecast/q/DC/Washington.json"
  $.ajax ({
    url: url,
    type: "get",
    dataType: "json"
  }).done(function(response){
    for (var i = 1; i < response.forecast.simpleforecast.forecastday.length; i++) {
    var forecastWeatherDay = response.forecast.simpleforecast.forecastday[i].date.weekday_short
    var forecastWeatherTempHigh = response.forecast.simpleforecast.forecastday[i].high.fahrenheit
    var forecastWeatherTempLow = response.forecast.simpleforecast.forecastday[i].low.fahrenheit
    var forecastWeatherConditions =  response.forecast.simpleforecast.forecastday[i].icon
    var weatherForecastDay = "<li class='weather__forecast--day'>" + forecastWeatherDay + "</li>"
    var weatherForecastIcon = "<li class='weather__forecast--icon " + forecastWeatherConditions + "'" + "></li>"
    var weatherForecastTempHigh = "<li class='weather__forecast--temphigh'>" + forecastWeatherTempHigh + "</li>"
    var weatherForecastTempLow = "<li class='weather__forecast--templow'>" + forecastWeatherTempLow + "</li>"
    $(".weather__forecast").append("<ul class='weather__forecast--conditions'>" + weatherForecastDay +  weatherForecastIcon + weatherForecastTempHigh + weatherForecastTempLow + "</ul>")
  }
  }).fail(function(){

  }).always(function(){

  })
});
