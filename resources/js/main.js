// Foursquare API Info
const clientId = '0LSBJSIDQILP0415DLTMHTYLXRYR1F4BTR34CCWD4YFDBYZB';
const clientSecret = 'QXOE43A1HEJEFRVK434BSN5X34LGFSQMY1CSKTKMLFWPOKP5';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '1af4557fb93e1865a26c5af90f2bdf81';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val()
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20201110`;
  try {
    const response = await fetch (urlToFetch);
    console.log(response)
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log (jsonResponse)
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      return venues;
    }
  } catch (error) {
    console.log(error)
  }
}

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&appid=${openWeatherKey}`
  try {
    const response = await fetch (urlToFetch);
    if (response.ok) {
      const jsonResponse = response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch (error) {
    console.log(error)
  }
}

const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.sufix}`;
    const venueContent = createVenueHTML (venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  })
  $destination.append(`<h2>${venues[0].location.city}</h2>`)
}

const renderForecast = (todayForecast) => {
  let forecastContent = createForecastHTML(todayForecast);
  $weatherDiv.append(forecastContent)
}

const executeSearch = () => {
    $input.empty();
    $venueDivs.forEach(venue => venue.empty());
    $destination.empty();
    $weatherDiv.empty();
    $container.css("visibility", "visible")
    getVenues()
    .then(venues => {
      return renderVenues(venues);
    })
    getForecast()
    .then(forecast => {
      return renderForecast(forecast)
    })
    return false;
  }
  
  $submit.click(executeSearch)