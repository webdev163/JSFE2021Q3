import Render from '../render';
import { Filters } from '../components/filters';
import filtersPageHtml from './filtersPage.html';
import Utils from '../utils';
import { StateInterface, ToysDataType } from '../types';
import Constants from '../constants';

const filters = new Filters();

export default class FiltersPage extends Filters {
  static setEventListeners(): void {
    const sortSelect = document.querySelector('.sort-select') as HTMLSelectElement;
    const resetButton = document.querySelector('.reset-button') as HTMLElement;
    const resetSettings = document.querySelector('.reset-button-ls') as HTMLElement;
    const colorControlsWrapper = document.querySelector('.color-controls-wrapper') as HTMLElement;
    const dropdown = document.querySelector('.custom-dropdown') as HTMLElement;
    const select = document.querySelector('.sort-select') as HTMLSelectElement;
    const shapeControlsInner = document.querySelector('.shape-controls-inner') as HTMLElement;
    const sizeControlsArr = document.querySelectorAll('.checkbox-size-inner') as NodeList;
    const checkboxFavorite = document.querySelector('.checkbox-favorite-inner') as HTMLElement;
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    const clearSearchButton = document.querySelector('.clear-btn') as HTMLElement;
    const gridWrapper = document.querySelector('.grid-wrapper') as HTMLElement;
    const toysCount = document.querySelector('.toys-count') as HTMLElement;

    gridWrapper.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).closest('.card-item')) {
        this.chooseToy(e);
      }
    });

    sortSelect.addEventListener('mousedown', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.add('active');
    });

    searchInput.addEventListener(
      'keyup',
      Utils.debounce(() => {
        this.updateState('search');
      }, 1000),
    );

    clearSearchButton.addEventListener('click', () => {
      searchInput.value = '';
      this.updateState('search');
    });

    sortSelect.addEventListener('change', (e: Event) => {
      this.updateState('sort', e);
    });

    shapeControlsInner.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).classList.contains('shape-btn')) {
        this.updateState('shape', e);
      }
    });

    sizeControlsArr.forEach(el =>
      el.addEventListener('click', (e: Event) => {
        if ((e.target as HTMLElement).classList.contains('size-controls-item')) {
          this.updateState('size', e);
        }
      }),
    );

    checkboxFavorite.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).classList.contains('favorite-controls-item')) {
        this.updateState('favorite', e);
      }
    });

    document.addEventListener(
      'slider-change',
      Utils.debounce(() => {
        this.updateState('minmax');
      }, 250),
    );

    resetButton.addEventListener('click', () => {
      filters.resetFilters();
    });

    resetSettings.addEventListener('click', () => {
      localStorage.clear();
      (document.querySelector('.toys-count-num') as HTMLElement).textContent = '0';
      filters.chosenArr = [];
      sortSelect.value = 'alphabet-sort';
      filters.state.sort = 'alphabet-sort';
      filters.resetFilters();
    });

    colorControlsWrapper.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).classList.contains('color-controls-item')) {
        this.updateState('color', e);
      }
    });

    dropdown.addEventListener('click', (e: Event) => {
      const element = <HTMLElement>e.target;
      select.value = element.dataset.value as string;
      select.dispatchEvent(new Event('change'));
      dropdown.classList.remove('active');
    });

    window.onbeforeunload = () => {
      this.updateLocalstorage();
    };

    toysCount.addEventListener('click', () => {
      filters.resetFilters(false);
      this.showChosenToys();
    });
  }

  static async render(): Promise<void> {
    const html: string = filtersPageHtml;
    await Render.render(html).then(() => {
      this.getLocalstorage();
      this.setEventListeners();
      Utils.handleSearchInput();
      Utils.createSliders();
      filters.filterSearch(filters.initArr);
    });
  }

  static updateState(type: string, e?: Event): void {
    switch (type) {
      case 'search': {
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        const searchQuery = searchInput.value;
        filters.state.query = searchQuery;
        break;
      }

      case 'color':
        if (e) {
          const targetColor = (e.target as HTMLElement).dataset.value || '';
          if ((e.target as HTMLInputElement).checked) {
            filters.state.color.push(targetColor);
          } else {
            filters.state.color = filters.state.color.filter((el: string) => el !== targetColor);
          }
        }
        break;

      case 'shape':
        if (e) {
          const targetShape = (e.target as HTMLElement).dataset.value || '';
          if (!(e.target as HTMLElement).classList.contains('active')) {
            filters.state.shape.push(targetShape);
          } else {
            filters.state.shape = filters.state.shape.filter((el: string) => el !== targetShape);
          }
          (e.target as HTMLElement).classList.toggle('active');
        }
        break;

      case 'size':
        if (e) {
          const targetCheckbox = e.target as HTMLInputElement;
          const targetSize = targetCheckbox.dataset.value || '';
          if (targetCheckbox.checked) {
            filters.state.size.push(targetSize);
          } else {
            filters.state.size = filters.state.size.filter((el: string) => el !== targetSize);
          }
        }
        break;

      case 'favorite':
        if (e) {
          if ((e.target as HTMLInputElement).checked) {
            filters.state.favorite = true;
          } else {
            filters.state.favorite = false;
          }
        }
        break;

      case 'minmax':
        filters.state.minCount = Number((document.getElementById('count-slider-value-min') as HTMLElement).textContent);
        filters.state.maxCount = Number((document.getElementById('count-slider-value-max') as HTMLElement).textContent);
        filters.state.minYear = Number((document.getElementById('year-slider-value-min') as HTMLElement).textContent);
        filters.state.maxYear = Number((document.getElementById('year-slider-value-max') as HTMLElement).textContent);
        break;

      default:
        //sorting
        if (e) {
          const targetSort = (e.target as HTMLSelectElement).value;
          filters.state.sort = targetSort;
        }
        break;
    }

    filters.filterSearch(filters.initArr);
  }

  static chooseToy(e: Event): void {
    const clicked: HTMLElement = e.target as HTMLElement;
    const cardItem: HTMLElement | null = clicked.closest('.card-item');
    if (cardItem !== null) {
      const cardNum: string = cardItem.dataset.num as string;
      const textElement = document.querySelector('.toys-count-num') as HTMLElement;
      let totalChosen = Number(textElement.textContent);
      if (cardItem.classList.contains('chosen')) {
        cardItem.classList.remove('chosen');
        filters.chosenArr = filters.chosenArr.filter((el: string) => el !== cardNum);
        totalChosen--;
        textElement.textContent = String(totalChosen);
      } else {
        if (filters.chosenArr.length >= Constants.CHOOSE_LIMIT) {
          this.openPopup();
          return;
        }
        cardItem.classList.add('chosen');
        filters.chosenArr.push(cardNum);
        totalChosen++;
        textElement.textContent = String(totalChosen);
      }
      localStorage.setItem('webdev163-chosen', JSON.stringify(filters.chosenArr));
    }
  }

  static updateLocalstorage(): void {
    localStorage.setItem('webdev163-filters', JSON.stringify(filters.state));
  }

  static getLocalstorage(): void {
    if (localStorage.getItem('webdev163-filters') !== null) {
      const filtersPreviousState: StateInterface = JSON.parse(localStorage.getItem('webdev163-filters') || '');
      (document.querySelector('.sort-select') as HTMLSelectElement).value = filtersPreviousState.sort;
      filtersPreviousState.color.forEach((el: string) => {
        (document.querySelector(`.color-controls-item[data-value=${el}]`) as HTMLInputElement).checked = true;
      });
      filtersPreviousState.shape.forEach((el: string) => {
        (document.querySelector(`.shape-btn[data-value=${el}]`) as HTMLElement).classList.add('active');
      });
      filtersPreviousState.size.forEach((el: string) => {
        (document.querySelector(`.size-controls-item[data-value=${el}]`) as HTMLInputElement).checked = true;
      });
      filtersPreviousState.favorite
        ? ((document.querySelector('.favorite-controls-item') as HTMLInputElement).checked = true)
        : 0;
      filters.state = filtersPreviousState;
    }
  }

  static openPopup(): void {
    const popup = document.querySelector('.popup') as HTMLElement;
    const popupBtn = document.querySelector('.popup-btn') as HTMLElement;
    const overlay = document.querySelector('#overlay') as HTMLElement;
    popup.classList.add('active');
    setTimeout(() => {
      overlay.classList.add('active');
    }, 200);
    popupBtn.addEventListener('click', () => {
      popup.classList.remove('active');
      overlay.classList.remove('active');
    });
  }

  static showChosenToys(): void {
    let chosenArr: Array<string> = [];
    let resultArr: ToysDataType = filters.initArr;
    if (localStorage.getItem('webdev163-chosen') !== null) {
      chosenArr = JSON.parse(localStorage.getItem('webdev163-chosen') || '') as Array<string>;
      resultArr = resultArr.filter(el => chosenArr.includes(el.num))
    }
    filters.generateCards(resultArr);
    if (!chosenArr.length) {
      (document.querySelector('.cards-wrapper') as HTMLElement).innerHTML = '<p class="no-overlap-title">Вы не выбрали ни одной игрушки</p>'
    }
  }
}
