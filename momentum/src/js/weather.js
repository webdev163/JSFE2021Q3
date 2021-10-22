const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const inputCity = document.querySelector('.city');

if (localStorage.getItem('webdev163-city')) {
  inputCity.value = localStorage.getItem('webdev163-city');
} else {
  inputCity.value = 'Minsk';
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=0109ffcce36c23456e156b4e7c7799ea&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === '400' || data.cod === '404') {
    weatherError.textContent = 'Wrong city name';
    inputCity.placeholder = '[Enter city]';
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
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    localStorage.setItem('webdev163-city', inputCity.value);
  }
}

getWeather()

inputCity.addEventListener('change', getWeather)