const createVenueHTML = (name, location, iconSrc) => {
    return `<h2>${name}</h2>
    <img class="placeImage" src="${iconSrc}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>
    `
}


const createForecastHTML = (dayForecast) => {
    console.log(dayForecast);
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
    <p>Temperature: ${kelvinToCelsius(dayForecast.main.temp)}&deg;C</p>
    <p>Condition: ${dayForecast.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png"">
    `
}

const kelvinToCelsius = k => (k -273.15).toFixed(0);