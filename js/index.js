const apiKey = '51a65cbbdb2901662f04a3352d4fcb48'
let bigNameEl = document.getElementById("city-name")
let bigIconEl = document.getElementById("single-icon")
let bigTempEl = document.getElementById("single-temp")
let bigWindEl = document.getElementById("single-wind")
let bigHumidityEl = document.getElementById("single-humidity")
let bigDateEl = document.getElementById("single-date")



// gets location
function getCity() {
    const newName = document.getElementById('searchForm')
    const cityName = document.getElementById('city-name')
    const city = newName.value.trim();
    cityName.innerHTML = city

    getWeather(city)

}

// gets weඞther for one location

function getWeather(city) {
    const weather_city_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    fetch(weather_city_url)
        .then(
            function (response) {
                return response.json();
            })
        .then(function (data) {
            let lat = data[0].lat;
            let lon = data[0].lon;
            console.log(`lat: ${lat}, lon: ${lon}`)

            const single_day_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
            fetch(single_day_url)
                .then(function (response) {
                    return response.json();
                })
                .then(
                    function (weatherData) {

                        // parseWeather()

                        let name = weatherData.city.name;
                        let wind = weatherData.list[0].wind;
                        let description = weatherData.list[0].weather[0].description;
                        let icon = weatherData.list[0].weather[0].icon;
                        let temp = weatherData.list[0].main.temp;
                        let humidity = weatherData.list[0].main.humidity;
                        let currentDate = dayjs().format(`MM/DD/YYYY`)

                        // console.log("Weather Data:", weatherData);
                        console.log("Name:", name)
                        console.log("Wind:", wind.speed);
                        console.log("Description:", description);
                        console.log("Icon:", icon);
                        console.log("Temp:", temp)
                        console.log("Humidity:", humidity);

                        bigNameEl.innerHTML = name;
                        bigWindEl.innerHTML = `Wind: ${wind.speed} mph `;
                        bigIconEl.src = `https://openweathermap.org/img/w/${icon}.png`
                        bigHumidityEl.innerHTML = `Humidity: ${humidity}%`
                        bigTempEl.innerHTML = `Temperature: ${temp} F`
                        bigDateEl.innerHTML = currentDate;
                        console.log("Date:", currentDate);
                        console.log("Updated HTML elements:", bigNameEl, bigWindEl, bigIconEl, bigHumidityEl, bigDateEl);
                    })

        }
        )



}


function buildSingleDayForcast(data) {
    return `<div class="border border-black m-3 p-3" id="single-day-city">${data.name}
    <ul>
        <li id="single-date"></li>
        <li id="single-icon"></li>
        <li id="single-temp">${data.temp}</li>
        <li id="single-wind">${data.wind}</li>
        <li id="single-humidity">${data.humidity}</li>
    </ul>`
}

// function parseWeather() {
//     for(const day in Range(0,4)) {
//         console.log(day)
//     }

// }

const searchButton = document.getElementById('searchForm-btn');
searchButton.addEventListener('click', function () {
    getCity()
});

//getWeather(city);
// gets 5 day forcast