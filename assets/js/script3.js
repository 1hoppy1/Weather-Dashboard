var getWeather = function() {
    console.log("function was called");

    fetch("https://api.openweathermap.org/data/2.5/weather?q=moab&appid=459a47d9d761867675c1905e97f5d2e2")
    .then(function(response) {
    response.json()
    .then(function(data) {
    console.log(data);
  });
});
};
getWeather();


// function weatherCallBack(weatherData) {

//     var cityName = weatherData.name;
//     var country = weatherData.sys.country;
//     var description = weatherData.weather[0].description;
    
//   //  console.log(cityName, country, description);
// }
// weatherCallBack();