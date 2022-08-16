

function displayTemperature(response){
    console.log(response.data)
    document.querySelector("#city").innerHTML = response.data.name
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    document.querySelector("#wind").innerHTML = `Wind: ${response.data.wind.speed} %`;
    document.querySelector("#description").innerHTML = `${response.data.weather[0].description}`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#precipitation").innerHTML = `Precipitation: `;
};
let units = "metric";
let apiKey = "f1cb380c1c026f0fa6c4898675e1a3ca";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=${units}`;
axios(apiUrl).then(displayTemperature);
