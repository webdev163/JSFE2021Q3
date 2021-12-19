import { data } from '../data';
import { ToyInterface, ToysDataType, StateInterface, SortTypes } from '../types';
import Constants from '../constants';

export class Filters {
  public initArr: ToysDataType;
  public state: StateInterface;
  public chosenArr: string[];

  constructor() {
    this.initArr = data;
    this.state = {
      query: '',
      sort: SortTypes.alphabetSort,
      shape: [],
      color: [],
      size: [],
      favorite: false,
      minCount: Constants.SLIDER_COUNT_MIN,
      maxCount: Constants.SLIDER_COUNT_MAX,
      minYear: Constants.SLIDER_YEAR_MIN,
      maxYear: Constants.SLIDER_YEAR_MAX,
    };
    this.chosenArr = [];
  }

  public filterSearch(arr: ToysDataType): void {
    if (this.state.query) {
      arr = arr.filter(el => el.name.toLowerCase().includes(this.state.query.toLowerCase()));
    }
    this.filterColor(arr);
  }

  private filterColor(arr: ToysDataType): void {
    if (this.state.color.length) {
      arr = arr.filter(el => this.state.color.includes(el.color));
    }
    this.filterShape(arr);
  }

  private filterShape(arr: ToysDataType): void {
    if (this.state.shape.length) {
      arr = arr.filter(el => this.state.shape.includes(el.shape));
    }
    this.filterSize(arr);
  }

  private filterSize(arr: ToysDataType): void {
    if (this.state.size.length) {
      arr = arr.filter(el => this.state.size.includes(el.size));
    }
    this.filterFavorite(arr);
  }

  private filterFavorite(arr: ToysDataType): void {
    if (this.state.favorite) {
      arr = arr.filter(el => el.favorite);
    }
    this.filterSliders(arr);
  }

  private filterSliders(arr: ToysDataType): void {
    arr = arr.filter(
      el =>
        +el.count >= this.state.minCount &&
        +el.count <= this.state.maxCount &&
        +el.year >= this.state.minYear &&
        +el.year <= this.state.maxYear,
    );
    this.sort(arr);
  }

  private sort(arr: ToysDataType): void {
    switch (this.state.sort) {
      case SortTypes.alphabetSortReversed:
        arr = this.reverseArr(this.sortText(arr));
        break;
      case SortTypes.yearSort:
        arr = this.sortYear(arr);
        break;
      case SortTypes.yearSortReversed:
        arr = this.reverseArr(this.sortYear(arr));
        break;
      default:
        arr = this.sortText(arr);
        break;
    }
    this.generateCards(arr);
  }

  private sortText(arr: ToysDataType): ToysDataType {
    return arr.sort((a: ToyInterface, b: ToyInterface) => a.name.localeCompare(b.name));
  }

  private sortYear(arr: ToysDataType): ToysDataType {
    return arr.sort((a: ToyInterface, b: ToyInterface) => Number(a.year) - Number(b.year));
  }

  private reverseArr<T>(array: T[]): T[] {
    return array.reverse();
  }

  public resetFilters(dispatchEvent = true): void {
    (document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>).forEach(
      el => (el.checked = false),
    );
    (document.querySelectorAll('.shape-btn') as NodeListOf<HTMLElement>).forEach(el => el.classList.remove('active'));
    (document.querySelector('.search-input') as HTMLInputElement).value = '';
    (document.querySelector('.clear-btn') as HTMLElement).classList.remove('active');
    (document.querySelector('.search-input') as HTMLElement).classList.remove('active');
    this.state.query = '';
    this.state.shape = [];
    this.state.color = [];
    this.state.size = [];
    this.state.favorite = false;
    if (dispatchEvent) {
      document.dispatchEvent(new Event('reset-sliders'));
    }
  }

  public generateCards(arr: ToysDataType): void {
    const cardsWrapper = document.querySelector('.cards-wrapper') as HTMLElement;
    if (cardsWrapper.innerHTML) cardsWrapper.innerHTML = '';
    if (arr && !arr.length) cardsWrapper.innerHTML = '<p class="no-overlap-title">Извините, совпадений не найдено</p>';
    let state: Array<string> = [];
    if (localStorage.getItem('webdev163-chosen') !== null) {
      state = JSON.parse(localStorage.getItem('webdev163-chosen') || '');
      (document.querySelector('.toys-count-num') as HTMLElement).textContent = String(state.length);
      this.chosenArr = state;
    }
    arr.map(el => {
      const div = document.createElement('div');
      div.className = 'card-item hidden';
      div.dataset.num = el.num;
      if (state.includes(el.num)) {
        div.classList.add('chosen');
      }
      div.innerHTML = this.getCardHtml(el);
      cardsWrapper.append(div);
    });
    this.animateCards();
  }

  private getCardHtml({ num, name, count, year, shape, color, size, favorite }: ToyInterface): string {
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
      <div class="card-btn-wrapper">
        <button class="add-btn btn">Добавить</button>
        <button class="delete-btn btn">Удалить</button>
      </div>
    `;
  }

  private animateCards(): void {
    let elements: NodeList;
    let windowHeight: number;

    const init = () => {
      elements = document.querySelectorAll('.hidden');
      windowHeight = window.innerHeight;
    };

    const checkPosition = () => {
      for (let i = 0; i < elements.length; i += 1) {
        const element = elements[i] as HTMLElement;
        const positionFromTop = element.getBoundingClientRect().top;

        if (positionFromTop - windowHeight <= Constants.CARDS_ANIMATION_OFFSET) {
          element.classList.add('animated');
          element.classList.remove('hidden');
        }
      }
    };

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
  }
}
