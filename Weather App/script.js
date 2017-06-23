var locationDisplay = document.querySelector(".city");
var tempDisplay = document.querySelector(".temperature p");
var condtitionDisplay = document.querySelector(".conditionDisplay");
var weatherIcon = document.querySelector(".weather-icon i");
var background = document.querySelector(".top");
var celsiusBtn = document.querySelector(".celsius");
var fahrenheitBtn = document.querySelector(".fahrenheit");

function getWeather() {
    
    //Get Latitude & Longitude
    navigator.geolocation.getCurrentPosition(function (location) {
        var latitude = location.coords.latitude;
        var longitude = location.coords.longitude;
            
            //Access OpenWeather
            var requestOpenWeather = new XMLHttpRequest();
            requestOpenWeather.open("GET", "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=7518d0a25a1389334087748dcb99303b", true);
            requestOpenWeather.onload = function () {
                if (requestOpenWeather.status >= 200 && requestOpenWeather.status < 400) {
                    var dataOpenWeather = JSON.parse(requestOpenWeather.responseText);
                    
                    var temperature = Math.floor(dataOpenWeather.main.temp - 273.15);
                    var weatherCondition = dataOpenWeather.weather[0].main;
                    var weatherDisplay = dataOpenWeather.weather[0].description; 
                    var city = dataOpenWeather.name;
                    var country = dataOpenWeather.sys.country;
                    
                    //console.log(dataOpenWeather);
                    
                    tempDisplay.textContent = temperature;
                    condtitionDisplay.textContent = weatherDisplay;
                    locationDisplay.textContent = city + ", " + country;
                    
                    switch(weatherCondition) {
                        case "Clear":
                            removeClass();
                            weatherIcon.classList.add("wi-day-sunny");
                            background.classList.add("clear-sky");
                            break;
                        case "Clouds":
                            removeClass();
                            weatherIcon.classList.add("wi-day-cloudy");
                            background.classList.add("clouds");
                            break;
                        case "Snow":
                            removeClass();
                            weatherIcon.classList.add("wi-day-snow-wind");
                            background.classList.add("");
                            break;
                        case "Rain":
                            removeClass();
                            weatherIcon.classList.add("wi-day-rain");
                            background.classList.add("rain");
                            break;
                        case "Drizzle":
                            removeClass();
                            weatherIcon.classList.add("wi-day-sprinkle");
                            background.classList.add("drizzle");
                            break;
                        case "Thunderstorm":
                            removeClass();
                            weatherIcon.classList.add("wi-day-storm-showers");
                            background.classList.add("thunderstorm");
                            break;
                        case "Mist":
                            removeClass();
                            weatherIcon.classList.add("wi-day-fog");
                            background.classList.add("mist");
                            break;
                    }
                    
                    celsiusBtn.addEventListener("click", function() {
                        fahrenheitBtn.classList.remove("active");
                        celsiusBtn.classList.add("active");
                        tempDisplay.textContent = temperature;
                    });
                    
                    fahrenheitBtn.addEventListener("click", function() {
                        celsiusBtn.classList.remove("active");
                        fahrenheitBtn.classList.add("active");
                        tempDisplay.textContent = temperature * 1.8 + 32;
                    });
                }
            };
            requestOpenWeather.send();
    });
}

getWeather();

function removeClass() {
    weatherIcon.classList.remove("wi-day-sunny");
    background.classList.remove("clear");
}