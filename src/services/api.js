import axios from 'axios';

const GeoApi = 'https://geocoding-api.open-meteo.com/v1/search';
const WeatherApi = 'https://api.open-meteo.com/v1/forecast';

export const searchCities = async (query) => {
  if (!query || query.length < 2) return [];
  try {
    const response = await axios.get(GeoApi, {
      params: {
        name: query,
        count: 5,
        language: 'en',
        format: 'json',
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

export const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(WeatherApi , {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,pressure_msl',
        hourly: 'temperature_2m,precipitation_probability,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
        timezone: 'auto',
        forecast_days: 7, 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherDescription = (code) => {
  const codes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
  };
  return codes[code] || 'Unknown';
};
