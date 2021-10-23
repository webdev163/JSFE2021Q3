import { state } from "./settings";

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const inputCity = document.querySelector('.city');

if (localStorage.getItem('webdev163-city')) {
  inputCity.value = localStorage.getItem('webdev163-city');
}

export async function getWeather() {
  const lang = state.language === 'english' ? 'en' : 'ru';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=${lang}&appid=0109ffcce36c23456e156b4e7c7799ea&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '400' || data.cod === '404') {
    weatherError.textContent = state.language === 'english' ? 'Wrong city name' : 'Город не найден';
    inputCity.placeholder = state.language === 'english' ? '[Enter city]' : '[Введите город]';
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  } else {
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = state.language === 'english' ? `Wind speed: ${Math.floor(data.wind.speed)} m/s` : `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
    humidity.textContent = state.language === 'english' ? `Humidity: ${data.main.humidity}%` : `Влажность: ${data.main.humidity}%`;
    localStorage.setItem('webdev163-city', inputCity.value);
  }
}

export function updateDefaultCity() {
  if (!localStorage.getItem('webdev163-city') || localStorage.getItem('webdev163-city') === 'Minsk' || localStorage.getItem('webdev163-city') === 'Минск') {
    inputCity.value = state.language === 'english' ? 'Minsk' : 'Минск';
  }
}

setTimeout(() => {
  updateDefaultCity()
  getWeather()
}, 1000);

inputCity.addEventListener('change', getWeather)