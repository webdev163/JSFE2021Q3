import { Toy, ToysData, State, SortTypes, SliderValues } from '../types';
import { CARDS_ANIMATION_OFFSET } from '../constants';

export class Filters {
  public initArr: ToysData;
  public state: State;
  public chosenArr: string[];

  constructor(initArr: ToysData) {
    this.initArr = initArr;
    this.state = {
      query: '',
      sort: SortTypes.alphabetSort,
      shape: [],
      color: [],
      size: [],
      isFavorite: false,
      minCount: SliderValues.sliderCountMin,
      maxCount: SliderValues.sliderCountMax,
      minYear: SliderValues.sliderYearMin,
      maxYear: SliderValues.sliderYearMax,
    };
    this.chosenArr = [];
  }

  public filterSearch(arr: ToysData): void {
    let filteredArr: ToysData = arr;
    if (this.state.query) {
      filteredArr = arr.filter(el => el.name.toLowerCase().includes(this.state.query.toLowerCase()));
    }
    this.filterColor(filteredArr);
  }

  private filterColor(arr: ToysData): void {
    let filteredArr: ToysData = arr;
    if (this.state.color.length) {
      filteredArr = arr.filter(el => this.state.color.includes(el.color));
    }
    this.filterShape(filteredArr);
  }

  private filterShape(arr: ToysData): void {
    let filteredArr: ToysData = arr;
    if (this.state.shape.length) {
      filteredArr = arr.filter(el => this.state.shape.includes(el.shape));
    }
    this.filterSize(filteredArr);
  }

  private filterSize(arr: ToysData): void {
    let filteredArr: ToysData = arr;
    if (this.state.size.length) {
      filteredArr = arr.filter(el => this.state.size.includes(el.size));
    }
    this.filterFavorite(filteredArr);
  }

  private filterFavorite(arr: ToysData): void {
    let filteredArr: ToysData = arr;
    if (this.state.isFavorite) {
      filteredArr = arr.filter(el => el.isFavorite);
    }
    this.filterSliders(filteredArr);
  }

  private filterSliders(arr: ToysData): void {
    const filteredArr = arr.filter(
      el =>
        +el.count >= this.state.minCount &&
        +el.count <= this.state.maxCount &&
        +el.year >= this.state.minYear &&
        +el.year <= this.state.maxYear,
    );
    this.sort(filteredArr);
  }

  private sort(arr: ToysData): void {
    let filteredArr: ToysData = arr;
    switch (this.state.sort) {
      case SortTypes.alphabetSort:
        filteredArr = this.sortText(arr);
        break;
      case SortTypes.alphabetSortReversed:
        filteredArr = this.reverseArr(this.sortText(arr));
        break;
      case SortTypes.yearSort:
        filteredArr = this.sortYear(arr);
        break;
      case SortTypes.yearSortReversed:
        filteredArr = this.reverseArr(this.sortYear(arr));
        break;
      default:
        break;
    }
    this.generateCards(filteredArr);
  }

  private sortText(arr: ToysData): ToysData {
    return arr.sort((a: Toy, b: Toy) => a.name.localeCompare(b.name));
  }

  private sortYear(arr: ToysData): ToysData {
    return arr.sort((a: Toy, b: Toy) => Number(a.year) - Number(b.year));
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
    this.state.isFavorite = false;
    if (dispatchEvent) {
      document.dispatchEvent(new Event('reset-sliders'));
    }
  }

  public generateCards(arr: ToysData): void {
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

  private getCardHtml({ num, name, count, year, shape, color, size, isFavorite }: Toy): string {
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
          <p class="favorite">Любимая: ${isFavorite ? 'да' : 'нет'}</p>
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

    const init: () => void = () => {
      elements = document.querySelectorAll('.hidden') as NodeList;
      windowHeight = window.innerHeight as number;
    };

    const checkPosition: () => void = () => {
      for (let i: number = 0; i < (elements.length as number); i += 1) {
        const element: HTMLElement = elements[i] as HTMLElement;
        const positionFromTop: number = element.getBoundingClientRect().top as number;

        if (positionFromTop - windowHeight <= CARDS_ANIMATION_OFFSET) {
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
