import "bootstrap";
import "./css/app.scss";
import  {fetchWeatherData, extractedData}  from './components/weather'
import { dom } from "./components/dom";

fetchWeatherData('Uyo')

dom.inputForm.addEventListener('submit', e => {
    e.preventDefault()
    fetchWeatherData(dom.inputValue.value);
    dom.inputForm.reset();
})

dom.celcius.addEventListener('click', e => {
    console.log('hey')
    console.log(extractedData.ok)
})

dom.farenHeit.addEventListener('click', e => {
    console.log('hey')
    console.log(extractedData.ok)
})
