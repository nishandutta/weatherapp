// DOM Elements
const radioCity = document.getElementById("city");
const radioLocation = document.getElementById("current_location");
const cityInput = document.getElementById("city_input");
const dropdown = document.getElementById("dropdown");
const searchBtn = document.getElementById("search");
const cityNameEl = document.getElementById("city_name");
const tempEl = document.getElementById("temp");
const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const weatherIcon = document.getElementById("weather_img");
const descriptionEl = document.getElementById("weather_description");
const cardContainer = document.getElementById("card_container");
const dropdownCities = document.getElementById("dropdown_cities");
const githubBtn = document.getElementById("github_btn");

const API_KEY = "7df05d21f7544cdfaa991117252004";

// Load saved city names
let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

// Open GitHub link
githubBtn.addEventListener("click", () => {
  window.open("https://github.com/nishandutta", "_blank");
});

// Toggle input visibility based on radio selection
const updateInputVisibility = () => {
  cityInput.style.display = radioCity.checked ? "block" : "none";
};

radioCity.addEventListener("change", updateInputVisibility);
radioLocation.addEventListener("change", updateInputVisibility);
updateInputVisibility();

// Show city suggestions
cityInput.addEventListener("input", () => {
  const value = cityInput.value.trim().toLowerCase();
  const matches = recentCities.filter(city => city.toLowerCase().startsWith(value));
  if (matches.length > 0) {
    dropdown.style.display = "block";
    dropdownCities.innerHTML = matches.map(
      city => `<li class="cursor-pointer p-1 hover:bg-blue-200 rounded">${city}</li>`
    ).join("");

    dropdownCities.querySelectorAll("li").forEach(li => {
      li.addEventListener("click", () => {
        cityInput.value = li.textContent;
        dropdown.style.display = "none";
      });
    });
  } else {
    dropdown.style.display = "none";
  }
});

// Hide dropdown if clicked outside
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && e.target !== cityInput) {
    dropdown.style.display = "none";
  }
});

// Render weather data
function renderWeather(data) {
  const date = data.location.localtime.split(" ")[0];
  cityNameEl.textContent = `${data.location.name} (${date})`;
  tempEl.innerHTML = `Temperature: <span class="font-normal">${data.current.temp_c}<sup>°</sup>C</span>`;
  windEl.innerHTML = `Wind: <span class="font-normal">${data.current.wind_kph} km/h</span>`;
  humidityEl.innerHTML = `Humidity: <span class="font-normal">${data.current.humidity}%</span>`;
  weatherIcon.src = `https:${data.current.condition.icon}`;
  weatherIcon.alt = data.current.condition.text;
  descriptionEl.textContent = data.current.condition.text;

  cardContainer.innerHTML = "";
  data.forecast.forecastday.forEach(day => {
    const cardHTML = `
      <div class="min-w-[140px] flex-shrink-0 bg-white/10 backdrop-blur-md text-white rounded-lg p-3 shadow-lg ring-1 ring-white/20">
        <h4 class="font-bold mb-1">${day.date}</h4>
        <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="mx-auto w-14 h-14" />
        <p class="text-sm mt-1">Temp: ${day.day.avgtemp_c}°C</p>
        <p class="text-sm">Wind: ${day.day.maxwind_kph} kph</p>
        <p class="text-sm">Humidity: ${day.day.avghumidity}%</p>
      </div>
    `;
    cardContainer.innerHTML += cardHTML;
  });
}

// Fetch by city
async function getWeatherByCity(city) {
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`);
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    alert("Could not fetch weather. Please check the city name.");
  }
}

// Fetch by coordinates
async function getWeatherByCoords(lat, lon) {
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7`);
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    alert("Location fetch failed. Showing default city.");
    getWeatherByCity("kolkata");
  }
}

// Search button click
searchBtn.addEventListener("click", () => {
  if (radioCity.checked) {
    const city = cityInput.value.trim().toLowerCase();
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    if (!recentCities.includes(city)) {
      recentCities.push(city);
      localStorage.setItem("recentCities", JSON.stringify(recentCities));
    }
    getWeatherByCity(city);
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
        err => {
          console.warn("Geolocation error:", err);
          alert("Location access denied. Showing default city.");
          getWeatherByCity("kolkata");
        }
      );
    } else {
      alert("Geolocation not supported. Showing default city.");
      getWeatherByCity("kolkata");
    }
  }
});

// Default on page load — try current location first
window.addEventListener("DOMContentLoaded", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => getWeatherByCity("kolkata")
    );
  } else {
    getWeatherByCity("kolkata");
  }
});
