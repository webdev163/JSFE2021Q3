import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wNumb';
import { State, SliderValues } from './types';

export const debounce = (fn: () => void, ms = 0): (() => void) => {
  let timeoutId: number;
  return (...args: []) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.call(args), ms);
  };
};

export const handleSearchInput: () => void = () => {
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

export const createSliders: () => void = () => {
  const countSlider = document.getElementById('count-slider-wrapper') as noUiSlider.target;
  const countSliderOutputMin = document.getElementById('count-slider-value-min') as HTMLElement;
  const countSliderOutputMax = document.getElementById('count-slider-value-max') as HTMLElement;
  const yearSlider = document.getElementById('year-slider-wrapper') as noUiSlider.target;
  const yearSliderOutputMin = document.getElementById('year-slider-value-min') as HTMLElement;
  const yearSliderOutputMax = document.getElementById('year-slider-value-max') as HTMLElement;

  let minCount = SliderValues.sliderCountMin;
  let maxCount = SliderValues.sliderCountMax;
  let minYear = SliderValues.sliderYearMin;
  let maxYear = SliderValues.sliderYearMax;

  if (localStorage.getItem('webdev163-filters') !== null) {
    const filtersPreviousState: State = JSON.parse(localStorage.getItem('webdev163-filters') || '');
    minCount = filtersPreviousState.minCount;
    maxCount = filtersPreviousState.maxCount;
    minYear = filtersPreviousState.minYear;
    maxYear = filtersPreviousState.maxYear;
  }

  noUiSlider.create(countSlider, {
    range: {
      min: SliderValues.sliderCountMin,
      max: SliderValues.sliderCountMax,
    },
    step: 1,
    start: [minCount, maxCount],
    format: wNumb({
      decimals: 0,
    }),
    connect: true,
  });

  countSlider?.noUiSlider?.on('update', values => {
    countSliderOutputMin.innerHTML = String(values[0]);
    countSliderOutputMax.innerHTML = String(values[1]);
  });

  countSlider?.noUiSlider?.on('change', () => {
    document.dispatchEvent(new Event('slider-change'));
  });

  noUiSlider.create(yearSlider, {
    range: {
      min: SliderValues.sliderYearMin,
      max: SliderValues.sliderYearMax,
    },
    step: 10,
    start: [minYear, maxYear],
    format: wNumb({
      decimals: 0,
    }),
    connect: true,
  });

  yearSlider?.noUiSlider?.on('update', values => {
    yearSliderOutputMin.innerHTML = String(values[0]);
    yearSliderOutputMax.innerHTML = String(values[1]);
  });

  yearSlider?.noUiSlider?.on('set', () => {
    document.dispatchEvent(new Event('slider-change'));
  });

  document.addEventListener('reset-sliders', () => {
    countSlider?.noUiSlider?.set([SliderValues.sliderCountMin, SliderValues.sliderCountMax]);
    yearSlider?.noUiSlider?.set([SliderValues.sliderYearMin, SliderValues.sliderYearMax]);
  });
}
