import { data } from './data';

import Constants from './constants';

export class Filters {
  constructor() {
    this.initArr = data;
    this.state = {
      query: '',
      sort: 'alphabet-sort',
      shape: [],
      color: [],
      size: [],
      favorite: false,
      minCount: 1,
      maxCount: 12,
      minYear: 1940,
      maxYear: 2020,
    }
    this.chosenArr = [];
  }

  sortText(arr) {
    return arr.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortYear(arr) {
    return arr.sort((a, b) => a.year - b.year);
  }

  resetFilters() {
    (document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>).forEach(el => el.checked = false);
    (document.querySelectorAll('.shape-btn') as NodeListOf<HTMLElement>).forEach(el => el.classList.remove('active'));
    (document.querySelector('.search-input') as HTMLInputElement).value = '';
    (document.querySelector('.clear-btn') as HTMLElement).classList.remove('active');
    (document.querySelector('.search-input') as HTMLElement).classList.remove('active');
    this.state.query = '';
    this.state.shape = [];
    this.state.color = [];
    this.state.size = [];
    this.state.favorite = false;
    document.dispatchEvent(new Event('reset-sliders'));
  }

  search(arr) {
    if (this.state.query) {
      arr = arr.filter(el => el.name.toLowerCase().includes(this.state.query.toLowerCase()));
    }
    this.color(arr);
  }

  color(arr) {
    if (this.state.color.length) {
      arr = arr.filter(el => this.state.color.includes(el.color));
    }
    this.shape(arr);
  }

  shape(arr) {
    if (this.state.shape.length) {
      arr = arr.filter(el => this.state.shape.includes(el.shape));
    } 
    this.size(arr);
  }

  size(arr) {
    if (this.state.size.length) {
      arr = arr.filter(el => this.state.size.includes(el.size));
    } 
    this.favorite(arr);
  }

  favorite(arr) {
    if (this.state.favorite) {
      arr = arr.filter(el => el.favorite);
    } 
    this.minmax(arr);
  }

  minmax(arr) {
    arr = arr.filter(el => +el.count >= this.state.minCount && +el.count <= this.state.maxCount && +el.year >= this.state.minYear && +el.year <= this.state.maxYear);
    this.sort(arr);
  }
  
  sort(arr) {
    switch (this.state.sort) {
      case 'alphabet-sort-reverse':
        arr = this.sortText(arr).reverse();
        break;
      case 'year-sort':
        arr = this.sortYear(arr);
        break;
      case 'year-sort-reverse':
        arr = this.sortYear(arr).reverse();
        break;
      default:
        arr = this.sortText(arr);
        break;
    }
    this.generateCards(arr)
  }

  generateCards(arr = this.initArr) {
    const cardsWrapper = document.querySelector('.cards-wrapper');
    if (cardsWrapper.innerHTML) cardsWrapper.innerHTML = '';
    if (!arr.length) cardsWrapper.innerHTML = '<p class="no-overlap-title">Извините, совпадений не найдено</p>';
    let state = [];
    if (localStorage.getItem('webdev163-chosen') !== null) {
      state = JSON.parse(localStorage.getItem('webdev163-chosen'));
      (document.querySelector('.toys-count-num') as HTMLElement).textContent = state.length;
      this.chosenArr = state;
    }
    arr = arr.map(el => {
      const div = document.createElement('div');
      div.className = 'card-item';
      div.dataset.num = el.num;
      if (state.includes(el.num)) {
        div.classList.add('chosen');
      }
      div.innerHTML = this.getCardHtml(el);
      cardsWrapper.append(div);
    });
    
  }

  getCardHtml({ num, name, count, year, shape, color, size, favorite }) {
    return `
      <h2 class="card-title">${name}</h3>
      <div class="card-content-wrapper">
        <div class="card-img-wrapper">
          <img class="card-img" src="assets/img/toys/${num}.png" alt="${name}">
        </div>
        <div class="card-text-wrapper">
          <p class="count">Количество: ${count}</p>
          <p class="year">Год покупки: ${year}</p>
          <p class="shape">Форма: ${shape}</p>
          <p class="color">Цвет: ${color}</p>
          <p class="size">Размер: ${size}</p>
          <p class="favorite">Любимая: ${favorite ? 'да' : 'нет'}</p>
        </div>
      </div>
    `;
  }
}
