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

                        for (let i = 0; i < 5; i++) {
                            const index = 4 + (i * 8); // Get noon at each day
                            document.getElementById(`date${i}`).innerHTML = weatherData.list[index].dt_txt.split(" ")[0];
                            document.getElementById(`wind${i}`).innerHTML = `Wind: ${weatherData.list[index].wind.speed}`
                            document.getElementById(`humidity${i}`).innerHTML = `Humidity: ${weatherData.list[index].main.humidity}`
                            document.getElementById(`temp${i}`).innerHTML = `Temperature: ${weatherData.list[index].main.temp} F`
                            document.getElementById(`icon${i}`).src = `https://openweathermap.org/img/w/${icon}.png`
                        }
                    })
            }

        )



}

const searchButton = document.getElementById('searchForm-btn');
searchButton.addEventListener('click', function () {
    getCity()
});
