import dom from './dom';

const API_KEY = '3bde4932bdb5a3dc33da7f043e0069e9';
const extractedData = {};

const celciusToFaren = (celcius) => ((celcius * 9) / 5 + 32).toFixed(2);

const readableDate = (date) => date.toString().split(' ').slice(0, 5).join(' ');

const parseData = (data) => {
  if (data.cod === '404') {
    alert(data.message);
    return;
  }

  const ok = true;
  const status = data.weather[0].main;
  const { description } = data.weather[0];
  const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const { temp } = data.main;
  const tempInFaren = celciusToFaren(data.main.temp);
  const { humidity } = data.main;
  const feelsLike = data.main.feels_like;
  const feelsLikeInFaren = celciusToFaren(data.main.feels_like);
  const { country } = data.sys;
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
  extractedData.temp = `${temp}<sup>0</sup>C`;
  extractedData.tempInFaren = `${tempInFaren}<sup>0</sup>F`;
  extractedData.feelsLike = `Feels like: ${feelsLike}<sup>0</sup>C`;
  extractedData.feelsLikeInFaren = `Feels like: ${feelsLikeInFaren}<sup>0</sup>F`;
};

const fetchWeatherData = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
      { mode: 'cors' },
    );
    const data = await response.json();
    parseData(data);
  } catch (error) {
    parseData(error);
  }
};

export { fetchWeatherData, extractedData };
