function getForecast(coordinates){
    console.log(coordinates)
    let apiKey = "f1cb380c1c026f0fa6c4898675e1a3ca"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl)
    axios.get(apiUrl).then(displayForecast);
};

function displayTemperature(response){
    
    celciusTemp = response.data.main.temp;
    document.querySelector("#city").innerHTML = response.data.name
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp)
    document.querySelector("#wind").innerHTML = `Wind: ${response.data.wind.speed} %`;
    document.querySelector("#description").innerHTML = `${response.data.weather[0].description}`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#time").innerHTML = formatDate(response.data.dt * 1000);
   document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    getForecast(response.data.coord);
   
};

function formatDate (timestamp){
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat"
    ];
    let date = new Date(timestamp);
    let day = days[date.getDay()];
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if(minutes < 10)
    {
        minutes = `0${minutes}`
    }
    return `${day}, ${hours}:${minutes}`
}
function search(city){
    let apiKey = "f1cb380c1c026f0fa6c4898675e1a3ca";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios(apiUrl).then(displayTemperature);
}
search("New York")
function handleSubmit(event){
    event.preventDefault();
    let cityElement = document.querySelector("#text-input");
    search(cityElement.value);
};
document.querySelector("#form").addEventListener("submit", handleSubmit)
function showFahrenheitTemp (event){
    event.preventDefault();
    let fahrenheitTemperature = (celciusTemp * 9) / 5 + 32;
    document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature)
};
function showCelciusTemp (event){
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(celciusTemp);
};
let celciusTemp = null;
document.querySelector("#fahrenheit-link").addEventListener("click", showFahrenheitTemp)
document.querySelector("#celcius-link").addEventListener("click", showCelciusTemp)
function formateDay(timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
    
    "Mon",
    "Tue", 
    "Wed",
    "Thu", 
    "Fri",
    "Sat",
    "Sun"
];
return days[day];
};
function displayForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecasrHTML = `<div class="row">`;
  
    
    forecast.forEach(function(forecastDay, index){
        if(index < 6){
    forecasrHTML = forecasrHTML + `
        <div class="col-2">
            <div class="weather-forecast date">${formateDay(forecastDay.dt)}</div>
            
             <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="icons" id="weather-icons" width="42">
                    <div class="weather-forecast-temp">
                        <span class="weather-forecast-max">${Math.round(forecastDay.temp.max)}??</span>
                        <span class="weather-forecsast-min">${Math.round(forecastDay.temp.min)}??</span>
                    </div>
                </div>
         `;}
})
    forecasrHTML = forecasrHTML + `</div>`
    forecastElement.innerHTML = forecasrHTML;
};
//displayForecast()
function showTemp(response) {
    console.log(response.data);
    displayTemperature(response)
  };
  
  function handlePosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    let apiKey = "f1cb380c1c026f0fa6c4898675e1a3ca";
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
  };
  function listenClick (){
  navigator.geolocation.getCurrentPosition(handlePosition);
  };
document.querySelector("#submit-location-input").addEventListener("click", listenClick )
