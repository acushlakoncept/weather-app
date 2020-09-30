import "bootstrap";
import "./css/app.scss";
import  {fetchWeatherData}  from './components/weather'
import { dom } from "./components/dom";

fetchWeatherData('Uyo')

dom.inputForm.addEventListener('submit', e => {
    e.preventDefault()
    fetchWeatherData(dom.inputValue.value);
    dom.inputForm.reset();
})

