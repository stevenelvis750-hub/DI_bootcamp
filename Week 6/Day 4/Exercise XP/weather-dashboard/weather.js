const axios = require("axios");
const chalk = require("chalk");

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

async function showWeather(city) {
  const cityName = city.trim();
  if (!cityName) {
    throw new Error("Please enter a city name.");
  }

  const locationsResponse = await axios.get(
    "https://geocoding-api.open-meteo.com/v1/search",
    { params: { name: cityName, count: 1, language: "en", format: "json" }, timeout: 10000 },
  );
  const location = locationsResponse.data.results?.[0];

  if (!location) {
    throw new Error(`No location found for "${cityName}".`);
  }

  const forecastResponse = await axios.get(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
        timezone: "auto",
      },
      timeout: 10000,
    },
  );
  const current = forecastResponse.data.current;
  const units = forecastResponse.data.current_units;
  const description = weatherDescriptions[current.weather_code] || "Unknown conditions";

  console.log(chalk.bold.cyan(`\nWeather for ${location.name}, ${location.country}`));
  console.log(`${chalk.yellow("Conditions:")} ${description}`);
  console.log(`${chalk.yellow("Temperature:")} ${current.temperature_2m}${units.temperature_2m}`);
  console.log(`${chalk.yellow("Feels like:")} ${current.apparent_temperature}${units.apparent_temperature}`);
  console.log(`${chalk.yellow("Humidity:")} ${current.relative_humidity_2m}${units.relative_humidity_2m}`);
  console.log(`${chalk.yellow("Wind:")} ${current.wind_speed_10m} ${units.wind_speed_10m}`);
}

module.exports = showWeather;