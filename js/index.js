const apiKey = '51a65cbbdb2901662f04a3352d4fcb48'
let bigNameEl = document.getElementById("single-day-city")
let bigIconEl = document.getElementById("single-icon")
let bigTempEl = document.getElementById("single-temp")
let bigWindEl = document.getElementById("single-wind")
let bigHumidityEl = document.getElementById("single-humidity")
let bigDateEl = document.getElementById("single-date")



// gets location
function getCity() {
    const newName = document.getElementById('searchForm')
    const cityName = document.getElementById('single-day-city')
    const city = newName.value.trim();
    cityName.innerHTML = city

    getWeather(city)

}

// gets weather for one location

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

                const single_day_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
                fetch(single_day_url)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(
                        function (weathterData) {
                            
                            let name = weathterData.name
                            let wind = weathterData.wind
                            let description = weathterData.weather[0].description;
                            let icon = weathterData.weather[0].icon;
                            let humidity = weathterData.main.humidity;
                            let currentDate = dayjs().format(`MM/DD/YYYY`)
                            
                            // console.log("Weather Data:", weatherData);
                            console.log("Name:", name)
                            console.log("Wind:", wind.speed);
                            console.log("Description:", description);
                            console.log("Icon:", icon);
                            console.log("Humidity:", humidity);
                           
                            bigNameEl.innerHTML = name;
                            bigWindEl.innerHTML(`Wind: ${wind.speed} mph `);
                            bigIconEl.src = `https://openweathermap.org/img/w/${icon}.png`
                            bigHumidityEl.innerHTML = `Humidity: ${humidity}%`
                            bigDateEl.innerHTML = currentDate;
                            console.log("Date:", currentDate);
                            console.log("Updated HTML elements:", bigNameEl, bigWindEl, bigIconEl, bigHumidityEl, bigDateEl);
                        })
                    
                    }
        )

    

}
  



 
const searchButton = document.getElementById('searchForm-btn');
    searchButton.addEventListener('click', function(){
    getCity()
});

getWeather();
// gets 5 day forcast