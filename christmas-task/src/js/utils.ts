import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default class Utils {
  static debounce = (fn, ms = 0) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  static handleSearchInput() {
    const searchInput = document.querySelector('.search-input') as HTMLElement;
    const clearButton = document.querySelector('.clear-btn') as HTMLElement;
    searchInput.addEventListener('input', (e: Event) => {
      if (searchInput.value) {
        searchInput.classList.add('active');
        clearButton.classList.add('active');
      } else {
        searchInput.classList.remove('active');
        clearButton.classList.remove('active');
      }
    });
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
    });
  }

  static createSliders() {
    const countSlider = document.getElementById('count-slider-wrapper');
    const countSliderOutputMin = document.getElementById('count-slider-value-min');
    const countSliderOutputMax = document.getElementById('count-slider-value-max');
    const yearSlider = document.getElementById('year-slider-wrapper');
    const yearSliderOutputMin = document.getElementById('year-slider-value-min');
    const yearSliderOutputMax = document.getElementById('year-slider-value-max');

    let minCount = 1;
    let maxCount = 12;
    let minYear = 1940;
    let maxYear = 2020;

    if (localStorage.getItem('webdev163-filters') !== null) {
      const filtersPreviousState = JSON.parse(localStorage.getItem('webdev163-filters'));
      minCount = filtersPreviousState.minCount;
      maxCount = filtersPreviousState.maxCount;
      minYear = filtersPreviousState.minYear;
      maxYear = filtersPreviousState.maxYear;
    }

    noUiSlider.create(countSlider, {
      range: {
        min: 1,
        max: 12,
      },
      step: 1,
      start: [minCount, maxCount],
      format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
      },
      connect: true,
    });

    countSlider.noUiSlider.on('update', function (values) {
      countSliderOutputMin.innerHTML = values[0];
      countSliderOutputMax.innerHTML = values[1];
      document.dispatchEvent(new Event('slider-change'));
    });

    noUiSlider.create(yearSlider, {
      range: {
        min: 1940,
        max: 2020,
      },
      step: 10,
      start: [minYear, maxYear],
      format: {
        to: (v) => parseFloat(v).toFixed(0),
        from: (v) => parseFloat(v).toFixed(0)
      },
      connect: true,
    });

    yearSlider.noUiSlider.on('update', function (values) {
      yearSliderOutputMin.innerHTML = values[0];
      yearSliderOutputMax.innerHTML = values[1];
      document.dispatchEvent(new Event('slider-change'));
    });

    document.addEventListener('reset-sliders', () => {
      console.log('123');
      
      countSlider.noUiSlider.set([1, 12]);
      yearSlider.noUiSlider.set([1940, 2020]);
    });
  }
}
