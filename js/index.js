const apiKey = '51a65cbbdb2901662f04a3352d4fcb48'




// gets location


// gets weather for one location

function getWeather() {
    const weatehr_city_url = `api.openweathermap.org/data/2.5/forecast?lat=${city_name}&appid=${apiKey}`
    fetch(weatehr_city_url)
        .then(
            function (response) {
                return response.json();
            })
        .then(
            function (data) {
                let lat = data.lat;
                let lon = data.lon;
                const weather_lat_lon_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
                fetch(weather_lat_lon_url)
                    .then(
                        function (response) {
                            return response.json();
                        })
            }
        )

}



// gets 5 day forcast