


// Variables for HTML elements (for the first card)
const locationInput = document.getElementById('searchLocation');  // Search bar input
const currentTemp = document.getElementById('current-temp');  // Temperature display
const currentConditions = document.getElementById('current-conditions');  // Weather condition display
const currentDetails = document.getElementById('current-details');  // Wind speed, humidity, and pressure display
const currentTitle = document.querySelector('.card-title'); // Title to display location name
const searchButton = document.getElementById('searchButton'); // Search button

const apiUrl = 'https://tomorrow-io1.p.rapidapi.com/v4/weather/forecast?';
const options = {
    method: 'GET', 
    headers: {
        'x-rapidapi-key': '13e168a898msh2931d7b200cb63bp1a99abjsnc5db81b8998a',
        'x-rapidapi-host': 'tomorrow-io1.p.rapidapi.com'
    }
};

// Function to map weather codes to FontAwesome icons and descriptions
function getWeatherData(weatherCode) {
    switch (weatherCode) {
        case 1000: return { description: "Clear", iconClass: 'fas fa-sun' };
        case 1001: return { description: "Cloudy", iconClass: 'fas fa-cloud' };
        case 1100: return { description: "Mostly Clear", iconClass: 'fas fa-cloud-sun' };
        case 1101: return { description: "Partly Cloudy", iconClass: 'fas fa-cloud-sun' };
        case 2100: return { description: "Light Rain", iconClass: 'fas fa-cloud-rain' };
        case 3000: return { description: "Thunderstorm", iconClass: 'fas fa-bolt' };
        case 5000: return { description: "Snow", iconClass: 'fas fa-snowflake' };
        default: return { description: "Unknown", iconClass: 'fas fa-question' };
    }
}

// Function to update the HTML elements with API data for the current weather (first card)
function updateWeatherUI(data) {
    const currentWeather = data.timelines.hourly[0].values;
    const locationName = data.location.name; // Get location name from API data

    currentTitle.innerText = locationName;
    const weatherData = getWeatherData(currentWeather.weatherCode);
    setBackground(currentWeather.weatherCode);

    // Update HTML with current weather data
    currentTemp.innerText = `${currentWeather.temperature.toFixed(1)}°C`;
    currentConditions.innerText = weatherData.description;
    currentDetails.innerHTML = `Wind: ${currentWeather.windSpeed.toFixed(2)} km/h,<br> Humidity: ${currentWeather.humidity}%,<br> Pressure: ${currentWeather.pressureSurfaceLevel.toFixed(2)} hPa`;
}

// Function to update the hourly forecast UI (second card)
function updateHourlyForecast(data) {
    const hourlyForecastContainer = document.getElementById('hourly-forecast'); // Hourly forecast display
    hourlyForecastContainer.innerHTML = ''; // Clear any previous forecast data

    const hourlyData = data.timelines.hourly.slice(0, 5); // Get the next 5 hours

    hourlyData.forEach(hour => {
        const forecastTime = new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temperature = hour.values.temperature.toFixed(1);
        const weatherInfo = getWeatherData(hour.values.weatherCode);

        // Create forecast HTML elements
        const forecastElement = document.createElement('div');
        forecastElement.classList.add('hourly-forecast-item');
        forecastElement.innerHTML = `
            <p><strong>${forecastTime}</strong></p>
            <p>${temperature}°C</p>
            <p><i class="${weatherInfo.iconClass}"></i> ${weatherInfo.description}</p>
        `;
        
        // Append each hourly forecast to the container
        hourlyForecastContainer.appendChild(forecastElement);
    });
}

// Function to set the background image based on the weather condition
function setBackground(weatherCode) {
    let backgroundUrl;

    if (weatherCode === 1000) {
        backgroundUrl = 'url("2nd.jpg")'; // Clear
    } else if (weatherCode === 1001) {
        backgroundUrl = 'url("3rd.jpg")'; // Cloudy
    } else if (weatherCode === 1100) {
        backgroundUrl = 'url("2nd.jpg")'; // Mostly Clear
    } else if (weatherCode === 1101) {
        backgroundUrl = 'url("3rd.jpg")'; // Partly Cloudy
    } else if (weatherCode === 2100) {
        backgroundUrl = 'url("4th.jpg")'; // Light Rain
    } else if (weatherCode === 3000) {
        backgroundUrl = 'url("1st.jpg")'; // Thunderstorm
    } else if (weatherCode === 5000) {
        backgroundUrl = 'url("5th.jpg")'; // Snow
    } else {
        backgroundUrl = 'url("2nd.jpg")'; // Fallback image
    }

    // Apply the background image to the body or main container
    document.body.style.backgroundImage = backgroundUrl;
}


// Function to fetch weather data for a given location
async function fetchWeatherData(location) {
    try {
        const url = `${apiUrl}location=${location}&timesteps=1h&units=metric`;
        const response = await fetch(url, options);
        const result = await response.json();

        if (response.ok && result) {
            updateWeatherUI(result);         // Update current weather card
            updateHourlyForecast(result);    // Update hourly forecast for the second card
        } else {
            alert("Unable to fetch weather data. Try a different location.");
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Add event listeners for the search functionality
locationInput.addEventListener('change', (event) => {
    const location = event.target.value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a location.");
    }
});

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert("Please enter a location.");
    }
});

// Fetch initial data for a default location (e.g., New York) on page load
fetchWeatherData("New York");
