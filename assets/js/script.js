var cityName = ""
var citylist = []

var loadcity = function () {
    var getlocation = JSON.parse(localStorage.getItem("location"))

    if (getlocation) {
        citylist = getlocation
    }
    var putInBox = document.getElementById("pR");
    // This "clears out" the old buttons created for past search results
    putInBox.textContent = ""

    // This pulls past searches, creates a button for each, and adds event listener
    for (let index = 0; index < citylist.length; index++) {

        var searchHistory = document.createElement("button")

        searchHistory.setAttribute("class", "pastResults")

        searchHistory.addEventListener("click", function () {
            cityName = citylist[index]
            loadWeather(cityName)
        })

        //This creates search "buttons" and puts past search results in them.
        var retrievedData = citylist[index];
        searchHistory.textContent = retrievedData

        putInBox.appendChild(searchHistory);
    }
}
loadcity()

var getWeather = function (event) {
    event.preventDefault();
    cityName = document.getElementById("cityID").value
    loadWeather(cityName)
}

var loadWeather = function (cityName) {

    if (cityName === "") {
        alert("Please enter valid city.");
    } else {

        if (!citylist.includes(cityName)) {
            citylist.push(cityName)
            localStorage.setItem("location", JSON.stringify(citylist))
        }
        /*this clears search box after button click*/
        document.getElementById('cityID').value = ''

        loadcity()

        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=459a47d9d761867675c1905e97f5d2e2&units=imperial")

            .then(function (response) {
                response.json()
                    // if (response.value === 404) {
                    //     alert("Please enter a valid city name.")
                    //     loadWeather();
                    // }
                    .then(function (data) {
                        console.log(data);
                        var city = data.name
                        var currentDate = moment(data.dt, "X").format("l")

                        var iconcode = data.weather[0].icon
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        var img = "<img src = '" + iconurl + "' />"
                        document.getElementById("weather").
                        innerHTML = city + " (" + currentDate + ") " + img

                        var temp = data.main.temp
                        document.getElementById("temp").innerHTML = "Temperature: " + temp + " &degF"

                        var hum = data.main.humidity
                        document.getElementById("hum").innerHTML = "Humidity: " + hum + "%"

                        var ws = data.wind.speed
                        document.getElementById("ws").innerHTML = "Wind Speed: " + ws + " MPH"
                        var lat = data.coord.lat
                        var lon = data.coord.lon

                        fetch("http://api.openweathermap.org/data/2.5/uvi?appid=459a47d9d761867675c1905e97f5d2e2&lat=" + lat + "&lon=" + lon)
                            .then(function (response) {
                                return response.json()
                            }).then(function (uv) {
                                console.log(uv.value)

                                if (uv.value <= 3) {
                                    document.getElementById('color').innerHTML = document.getElementById('color').style.backgroundColor = "green";
                                }
                                if (uv.value > 3 && uv.value < 6) {
                                    document.getElementById('color').innerHTML = document.getElementById('color').style.backgroundColor = "yellow";
                                }
                                if (uv.value >= 6) {
                                    document.getElementById('color').innerHTML = document.getElementById('color').style.backgroundColor = "red";
                                }

                                var uvValue = uv.value
                                document.getElementById("color").innerHTML = "UV Index: " + uvValue

                                fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=459a47d9d761867675c1905e97f5d2e2&units=imperial").then(function (response) {
                                    return response.json()
                                }).then(function (fiveday) {
                                    console.log(fiveday)
                                    var element = document.getElementById("please");
                                    element.textContent = ""
                                    for (let i = 1; i < fiveday.list.length; i++) {
                                        if (fiveday.list[i].dt_txt.indexOf("00:00:00") > -1) {
                                            console.log(fiveday.list[i])
                                            // console.log(fiveday.list[i])
                                            console.log(fiveday.list[i].main.temp, "individual day")

                                            var fivedaydate = moment(fiveday.list[i].dt, "X").format("l")

                                            var fivedaytemp = fiveday.list[i].main.temp

                                            var fivedayhum = fiveday.list[i].main.humidity

                                            var para = document.createElement("p");

                                            var fivedaynode = document.createTextNode(fivedaydate);

                                            para.appendChild(fivedaynode);

                                            var img = document.createElement("img")
                                            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                                            img.setAttribute("src", iconurl)
                                            para.appendChild(img)

                                            para.setAttribute("id", "formatthis")
                                            para.setAttribute("class", "card border-dark mb-3")
                                            para.setAttribute("style", "width: 8rem")

                                            var node1 = document.createTextNode("Temp: " + fivedaytemp + " \u00B0" + "F" + "\r\n");

                                            var node2 = document.createTextNode("Hum: " + fivedayhum + " %");

                                            para.appendChild(node1);

                                            para.appendChild(node2);

                                            element.appendChild(para);

                                            var fivedaydate = moment(fiveday.list[i].dt, "X").format("l")
                                            var fivedaytemp = fiveday.list[i].main.temp
                                            var fivedayhum = fiveday.list[i].main.humidity
                                        }
                                    }
                                })
                            })
                    });
            });
    };
}

document.getElementById("myBtn").addEventListener("click", getWeather);