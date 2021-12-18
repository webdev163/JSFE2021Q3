import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wNumb';
import { StateInterface } from './types';
import Constants from './constants';

export default class Utils {
  static debounce = (fn: () => void, ms = 0): (() => void) => {
    let timeoutId: number;
    return (...args: []) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.call(args), ms);
    };
  };

  static handleSearchInput(): void {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    const clearButton = document.querySelector('.clear-btn') as HTMLElement;
    searchInput.addEventListener('input', () => {
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

  static createSliders(): void {
    const countSlider = document.getElementById('count-slider-wrapper') as noUiSlider.target;
    const countSliderOutputMin = document.getElementById('count-slider-value-min') as HTMLElement;
    const countSliderOutputMax = document.getElementById('count-slider-value-max') as HTMLElement;
    const yearSlider = document.getElementById('year-slider-wrapper') as noUiSlider.target;
    const yearSliderOutputMin = document.getElementById('year-slider-value-min') as HTMLElement;
    const yearSliderOutputMax = document.getElementById('year-slider-value-max') as HTMLElement;

    let minCount = Constants.SLIDER_COUNT_MIN;
    let maxCount = Constants.SLIDER_COUNT_MAX;
    let minYear = Constants.SLIDER_YEAR_MIN;
    let maxYear = Constants.SLIDER_YEAR_MAX;

    if (localStorage.getItem('webdev163-filters') !== null) {
      const filtersPreviousState: StateInterface = JSON.parse(localStorage.getItem('webdev163-filters') || '');
      minCount = filtersPreviousState.minCount;
      maxCount = filtersPreviousState.maxCount;
      minYear = filtersPreviousState.minYear;
      maxYear = filtersPreviousState.maxYear;
    }

    noUiSlider.create(countSlider, {
      range: {
        min: Constants.SLIDER_COUNT_MIN,
        max: Constants.SLIDER_COUNT_MAX,
      },
      step: 1,
      start: [minCount, maxCount],
      format: wNumb({
        decimals: 0,
      }),
      connect: true,
    });

    countSlider?.noUiSlider?.on('update', function (values) {
      countSliderOutputMin.innerHTML = String(values[0]);
      countSliderOutputMax.innerHTML = String(values[1]);
      document.dispatchEvent(new Event('slider-change'));
    });

    noUiSlider.create(yearSlider, {
      range: {
        min: Constants.SLIDER_YEAR_MIN,
        max: Constants.SLIDER_YEAR_MAX,
      },
      step: 10,
      start: [minYear, maxYear],
      format: wNumb({
        decimals: 0,
      }),
      connect: true,
    });

    yearSlider?.noUiSlider?.on('update', function (values) {
      yearSliderOutputMin.innerHTML = String(values[0]);
      yearSliderOutputMax.innerHTML = String(values[1]);
      document.dispatchEvent(new Event('slider-change'));
    });

    document.addEventListener('reset-sliders', () => {
      countSlider?.noUiSlider?.set([Constants.SLIDER_COUNT_MIN, Constants.SLIDER_COUNT_MAX]);
      yearSlider?.noUiSlider?.set([Constants.SLIDER_YEAR_MIN, Constants.SLIDER_YEAR_MAX]);
    });
  }
}
