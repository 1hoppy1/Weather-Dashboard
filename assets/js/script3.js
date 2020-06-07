var getWeather = function (event) {
    event.preventDefault();
    var cityName = document.getElementById("cityID").value
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=459a47d9d761867675c1905e97f5d2e2&units=imperial")
        .then(function (response) {
            response.json()
                .then(function (data) {
                    console.log(data);
                    var city = data.name
                    var currentDate = moment(data.dt, "X").format("l")

                    var iconcode = data.weather[0].icon
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    var img = "<img src = '" + iconurl + "' />"
                    document.getElementById("weather").
                    innerHTML = city + "(" + currentDate + ")" + img

                    var temp = data.main.temp
                    document.getElementById("temp").innerHTML = "Temperature: " + temp

                    var hum = data.main.humidity
                    document.getElementById("hum").innerHTML = "Humidity: " + hum

                    var ws = data.wind.speed
                    document.getElementById("ws").innerHTML = "Wind Speed: " + ws
                    var lat = data.coord.lat
                    var lon = data.coord.lon

                    fetch("http://api.openweathermap.org/data/2.5/uvi?appid=459a47d9d761867675c1905e97f5d2e2&lat=" + lat + "&lon=" + lon)
                        .then(function (response) {
                            return response.json()
                        }).then(function (uv) {
                            console.log(uv)

                            var uvValue = uv.value
                            document.getElementById("uvi").innerHTML = "UV Index " + uvValue

                            fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=459a47d9d761867675c1905e97f5d2e2&units=imperial").then(function (response) {
                                return response.json()
                            }).then(function (fiveday) {
                                console.log(fiveday)

                                for (let i = 0; i < fiveday.list.length; i++) {
                                    if (fiveday.list[i].dt_txt.indexOf("00:00:00") > -1) {
                                        console.log(fiveday.list[i])
                                    }

                                }
                            })
                        })
                });
        });

};

document.getElementById("myBtn").addEventListener("click", getWeather)