const apiKey = '51a65cbbdb2901662f04a3352d4fcb48'
let city_name = 'hattiesburg'



// gets location


// gets weather for one location

function getWeather() {
    const weatehr_city_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${apiKey}`
    fetch(weatehr_city_url)
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
                            
                            // console.log("Weather Data:", weatherData);
                            console.log("Name:", name)
                            console.log("Wind:", wind);
                            console.log("Description:", description);
                            console.log("Icon:", icon);
                            console.log("Humidity:", humidity);
                        })
                    
                    }
        )

}

getWeather();


// gets 5 day forcast