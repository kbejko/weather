$(document).ready(function(){

  // Current Conditions API
  var urlCurrent = 'http://api.wunderground.com/api/0774b434e8a6f2aa/conditions/q/DC/Washington.json'
  $.ajax ({
    url: urlCurrent,
    type: 'get',
    dataType: 'json'
  }).done(function(response){
    var currentCity = response.current_observation.display_location.full
    var currentWeatherTemp = Math.round(response.current_observation.temp_f)
    var currentWeatherConditions =  response.current_observation.icon
    var currentWind = response.current_observation.wind_mph

    $('.container').addClass('container__' + currentWeatherConditions)
    $('.weather__image').addClass('weather__image--' + currentWeatherConditions)
    $('#city').append(currentCity)

    //Adds additional windy icon if more than 10mph
    if (currentWind > 10) {
      $('#conditions').append('<h2>' + currentWeatherTemp + '&deg;F</h2>', '<span class=' + currentWeatherConditions + '></span><span class="windy">')
    } else {
      $('#conditions').append('<h2>' + currentWeatherTemp + '&deg;F</h2>', '<span class=' + currentWeatherConditions + '></span>')
    }

    //Catchall for illustration to be cold lady no matter if it's snowing
    if (currentWeatherTemp < 32) {
      $('.weather__image').addClass('weather__image--snow')
    }
  }).fail(function(err){
    console.log('Error: ' + err.status)
    $('.weather').append('<h1>The storm must have knocked down the server ¯\\_(ツ)_/¯ </h1>')
  }).success(function(){
    console.log('It worked!')
  })

  //Forecast API
  var url = 'http://api.wunderground.com/api/0774b434e8a6f2aa/forecast/q/DC/Washington.json'
  $.ajax ({
    url: url,
    type: 'get',
    dataType: 'json'
  }).done(function(response){
    for (var i = 1; i < response.forecast.simpleforecast.forecastday.length; i++) {
    var forecastWeatherDay = response.forecast.simpleforecast.forecastday[i].date.weekday_short
    var forecastWeatherTempHigh = response.forecast.simpleforecast.forecastday[i].high.fahrenheit
    var forecastWeatherTempLow = response.forecast.simpleforecast.forecastday[i].low.fahrenheit
    var forecastWeatherConditions =  response.forecast.simpleforecast.forecastday[i].icon
    var weatherForecastDay = '<li class="weather__forecast--day">' + forecastWeatherDay + '</li>'
    var weatherForecastIcon = '<li class="weather__forecast--icon ' + forecastWeatherConditions + '"' + '></li>'
    var weatherForecastTempHigh = '<li class="weather__forecast--temphigh">' + forecastWeatherTempHigh + '</li>'
    var weatherForecastTempLow = '<li class="weather__forecast--templow">' + forecastWeatherTempLow + '</li>'
    $('.weather__forecast').append('<ul class="weather__forecast--conditions">' + weatherForecastDay +  weatherForecastIcon + weatherForecastTempHigh + weatherForecastTempLow + '</ul>')
  }
  //
  // // Thorough forecast overlay
  // for (var i = 0; i < response.forecast.txt_forecast.forecastday.length; i += 2) {
  //   var forecastWeatherTitle = response.forecast.txt_forecast.forecastday[i].title
  //   var forecastText = response.forecast.txt_forecast.forecastday[i].fcttext
  //   $('.weather__forecast--thorough').append('<div><h1>' + forecastWeatherTitle + '</h1><p>' + forecastText +'</p></div>')
  // }
  //
  // $('#plus').on('click', function(){
  //   console.log('hello')
  //   $('.weather__forecast--thorough').toggleClass('show-thorough')
  // })
}).fail(function(err){
    console.log('Error: ' + err.status)
  }).success(function(){
    console.log('This part also worked!')
  })
});
