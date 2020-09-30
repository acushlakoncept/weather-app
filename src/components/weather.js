import { dom } from "./dom";

const API_KEY = "3bde4932bdb5a3dc33da7f043e0069e9";
const extractedData = {};

const parseData = (data) => {
  if (data.cod === "404") {
    extractedData.ok = false;
    alert(data.message);
    extractedData.message = data.message;
    return;
  }

  const ok = true;
  const status = data.weather[0].main;
  const description = data.weather[0].description;
  const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const temp = data.main.temp;
  const tempInFaren = celciusToFaren(data.main.temp);
  const minTemp = data.main.temp_min;
  const minTempInFaren = celciusToFaren(data.main.temp_min);
  const maxTemp = data.main.temp_max;
  const maxTempInFaren = celciusToFaren(data.main.temp_max);
  const humidity = data.main.humidity;
  const feelsLike = data.main.feels_like;
  const feelsLikeInFaren = celciusToFaren(data.main.feels_like);
  const country = data.sys.country;
  const sunrise = readableDate(new Date(parseInt(data.sys.sunrise, 10) * 1000));
  const sunset = readableDate(new Date(parseInt(data.sys.sunset, 10) * 1000));
  const cityName = data.name;
  const date = readableDate(new Date(parseInt(data.dt, 10) * 1000));

  dom.city.innerText = `${cityName}, ${country}`;
  dom.icon.src = icon;
  dom.temp.innerHTML = `${temp}<sup>0</sup>C`;
  dom.status.innerText = `${status} | ${description}`;
  dom.humidity.innerText = `Humidity: ${humidity}%`;
  dom.feelsLike.innerHTML = `Feels like: ${feelsLike}<sup>0</sup>C`;
  dom.date.innerText = date;

  extractedData.ok = ok;
  extractedData.status = status;
  extractedData.temp = temp;
  extractedData.tempInFaren = tempInFaren;
  extractedData.feelsLike = feelsLike;
  extractedData.feelsLikeInFaren = feelsLikeInFaren;
};

const celciusToFaren = (celcius) => {
  return ((celcius * 9) / 5 + 32).toFixed(2);
};

const readableDate = (date) => {
  return date.toString().split(" ").slice(0, 5).join(" ");
};

const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      { mode: "cors" }
    );
    const data = await response.json();
    parseData(data);
  } catch (error) {
    parseData(error);
  }
};

export { fetchWeatherData, extractedData };
