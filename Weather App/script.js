//Google API Key: AIzaSyAlWIADaXAVlta6D-fjY_k7J_TGkCAq_Ek
//OpenWeather API Key: 7518d0a25a1389334087748dcb99303b

var cityName = document.querySelector(".city-name");
var tempDisplay = document.querySelector(".temperature");

function getLocation() {
    
    //Get Latitude & Longitude
    navigator.geolocation.getCurrentPosition(function (location) {
        var latitude = location.coords.latitude;
        var longitude = location.coords.longitude;
        
        //Access Google Geolocation    
        var requestGoogle = new XMLHttpRequest();
        
        requestGoogle.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyAlWIADaXAVlta6D-fjY_k7J_TGkCAq_Ek", true);
        requestGoogle.onload = function () {
            if (requestGoogle.status >= 200 && requestGoogle.status < 400) {
                var dataGoogle = JSON.parse(requestGoogle.responseText);
                var city = dataGoogle.results[0].address_components[2].long_name;
                var country = dataGoogle.results[0].address_components[4].long_name;
                
                cityName.textContent = city + ", " + country;
            }
            
            //Acces OpenWeather
            var requestOpenWeather = new XMLHttpRequest();
            requestOpenWeather.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + city + "," + country + "&APPID=7518d0a25a1389334087748dcb99303b", true);
            requestOpenWeather.onload = function () {
                if (requestOpenWeather.status >= 200 && requestOpenWeather.status < 400) {
                    var dataOpenWeather = JSON.parse(requestOpenWeather.responseText);
                    var temperature = Math.floor(dataOpenWeather.main.temp - 273.15);
                    tempDisplay.textContent = temperature + "°C";
                    
                }
            };
            requestOpenWeather.send();
        };
        requestGoogle.send();
    });
    
}

getLocation();