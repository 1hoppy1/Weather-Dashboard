var getWeather = function (event,) {
    event.preventDefault(); 
    var cityName = document.getElementById("cityID").value

    localStorage.setItem("location", cityName)

    var searchHistory = document.createElement("button")
    searchHistory.setAttribute("style", 'href')
    
    var element = document.getElementById("memory");
    element.appendChild(searchHistory);

//     var test = document.createElement("href")
//     test.document.getElementById("memory").innerHTML = localStorage.getItem("lastname");
//    test.setAttribute("id", "ftemp")
//     document.memory.appendChild(test)


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
                    innerHTML = city + " ("+ currentDate +") " + img

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
                            console.log(uv.value)

if (uv.value <=2.9) {
    document.getElementById('color').innerHTML = document.getElementById('color').style.backgroundColor = "green";
}
//  if (3 <= uv.value <= 5.9) {
//      document.getElementById('color').innerHTML = document.getElementById('color').style.backgroundColor = "yellow";
// }
if (uv.value >6) {
    document.getElementById('color').innerHTML = document.getElementById('color').style.backgroundColor = "red";
}



                            var uvValue = uv.value
                            document.getElementById("color").innerHTML = "UV Index: " + uvValue






                            fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=459a47d9d761867675c1905e97f5d2e2&units=imperial").then(function (response) {
                                return response.json()
                            }).then(function (fiveday) {
                                console.log(fiveday)

                                for (let i = 0; i < fiveday.list.length; i++) {
                                    if (fiveday.list[i].dt_txt.indexOf("00:00:00") > -1) {
                                        console.log(fiveday.list[i])
                                       // console.log(fiveday.list[i])
                                        console.log(fiveday.list[i].main.temp, "individual day")

var fivedaydate = moment(fiveday.list[i].dt, "X").format("l")


var fivedaytemp = fiveday.list[i].main.temp


var fivedayhum = fiveday.list[i].main.humidity


var para = document.createElement("p");


var node = document.createTextNode(fivedaydate + "  fivedayimg  " + "Temp:" + fivedaytemp + "Hum: " + fivedayhum);


para.setAttribute("id", "formatthis")
para.setAttribute("class", "card border-dark mb-3")
para.setAttribute("style", "width: 8rem")
//para.setAttribute("style", "textAlign: center")
para.appendChild(node);

var element = document.getElementById("please");
element.appendChild(para);



var fivedaydate = moment(fiveday.list[i].dt, "X").format("l")
var fivedaytemp = fiveday.list[i].main.temp
var fivedayhum = fiveday.list[i].main.humidity

// this only changes the first box to the last days data.... document.getElementById("formatthis").innerHTML = fivedaydate + "  fivedayimg  " + "Temp:  " + fivedaytemp + "Hum: " + fivedayhum;


//document.getElementById("formatthis").innerHTML = fivedaydate + "fivedayimg" + "Temp:" + fivedaytemp + "Hum: " + fivedayhum;



//element.appendChild(no);

// var fivedayicon = fiveday.list[i].weather[0].icon
// var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
// var fivedayimg = "<img src = '" + iconurl + "' />"
// document.getElementById("formatthis").innerHTML =fivedaydate + fivedayimg + "Temp:" + fiveday.list[i].main.temp +"Hum: " + fivedayhum ;

// var fivedayimg = document.createElement("img");
// var node = document.createTextNode(fivedayimg);
// innerimg.appendChild(node)
// var element = document.getElementById("fdimg");
// element.appendChild(innerimg);



// const please = document.getElementById("myList1");
// const fruitList = ["banana", "orange", "mango", "lemon"];

// for (let fruit of fruitList) {
//     let newListItem = document.createElement("div");
//     newListItem.textContent = fruit;

//     please.appendChild(newListItem)
// }


        // var node = document.createElement("p")
        // var textnode = document.createTextNode(fiveday.list[i].main.temp);
        // node.appendChild(textnode);
        // document.getElementById("ftemp").appendChild(node);

        // var test = document.createElement("p")
        // test.innerHTML = JSON.stringify(fiveday.list[i].main.temp)
        // test.setAttribute("id", "ftemp")
        //   document.myList1.ftemp.appendChild(test)

        //  var test = document.createElement("p")
        //   test.innerHTML = JSON.stringify(fiveday.list[i].main.temp)
        //   test.setAttribute("id", "ftemp")
        //     document.body.appendChild(test)






//console.log(ftemp);


                                    }
                                    

                                }
                            })
                        })
                });
        });

};

document.getElementById("myBtn").addEventListener("click", getWeather);