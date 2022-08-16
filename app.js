function displayTemperature(response){
    console.log(response.data)
    document.querySelector("#city").innerHTML = response.data.name
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp)
    document.querySelector("#wind").innerHTML = `Wind: ${response.data.wind.speed} %`;
    document.querySelector("#description").innerHTML = `${response.data.weather[0].description}`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#time").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.wweather[0].icon}@2x.png`)
};
let units = "metric";
let city = "Paris"
let apiKey = "f1cb380c1c026f0fa6c4898675e1a3ca";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios(apiUrl).then(displayTemperature);

function formatDate (timestamp){
    let days = [
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat",
        "Sun"
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
