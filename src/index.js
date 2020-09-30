import "bootstrap";
import "./css/app.scss";
import { fetchWeatherData, extractedData } from "./components/weather";
import { dom } from "./components/dom";

fetchWeatherData("Uyo");

dom.inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchWeatherData(dom.inputValue.value);
  dom.inputForm.reset();
});

dom.celcius.addEventListener("click", (e) => {
  dom.temp.innerHTML = extractedData.temp;
  dom.feelsLike.innerHTML = extractedData.feelsLike;
});

dom.fahren.addEventListener("click", (e) => {
  dom.temp.innerHTML = extractedData.tempInFaren;
  dom.feelsLike.innerHTML = extractedData.feelsLikeInFaren;
});
