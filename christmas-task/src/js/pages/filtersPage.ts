import Render from '../render';
import { Filters } from '../filters';
import filtersPageHtml from './filtersPage.html';
import Utils from '../utils';

const filters = new Filters();

export default class FiltersPage extends Filters {
  static setEventListeners(): void {
    const sortSelect = document.querySelector('.sort-select') as HTMLElement;
    const resetButton = document.querySelector('.reset-button') as HTMLElement;
    const resetButtonLs = document.querySelector('.reset-button-ls') as HTMLElement;
    const colorControlsWrapper = document.querySelector('.color-controls-wrapper') as HTMLElement;
    const dropdown = document.querySelector('.custom-dropdown') as HTMLElement;
    const select = document.querySelector('.sort-select') as HTMLSelectElement;
    const shapeControlsInner = document.querySelector('.shape-controls-inner') as HTMLElement;
    const sizeControlsArr = document.querySelectorAll('.checkbox-size-inner') as NodeList;
    const checkboxFavorite = document.querySelector('.checkbox-favorite-inner') as HTMLElement;
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    const clearSearchButton = document.querySelector('.clear-btn') as HTMLElement;
    const gridWrapper = document.querySelector('.grid-wrapper') as HTMLElement;

    gridWrapper.addEventListener('click', (e: Event) => {
      if (e.target.closest('.card-item')) {
        this.chooseToy(e);
      }
    });

    sortSelect.addEventListener('mousedown', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.add('active');
    });

    searchInput.addEventListener('keyup', Utils.debounce(() => {
      this.updateState('search', null);
    }, 250));

    clearSearchButton.addEventListener('click', () => {
      searchInput.value = '';
      this.updateState('search', null);
    });

    sortSelect.addEventListener('change', e => {
      this.updateState('sort', e);
    });

    shapeControlsInner.addEventListener('click', (e) => {
      if (e.target.classList.contains('shape-btn')) {
        this.updateState('shape', e);
      }
    })

    sizeControlsArr.forEach(el => el.addEventListener('click', (e) => {
      if (e.target.classList.contains('size-controls-item')) {
        this.updateState('size', e);
      }
    }))

    checkboxFavorite.addEventListener('click', (e) => {
      if (e.target.classList.contains('favorite-controls-item')) {
        this.updateState('favorite', e);
      }
    })

    document.addEventListener('slider-change', Utils.debounce(() => {
      this.updateState('minmax', null);
    }, 250)) 

    resetButton.addEventListener('click', () => {
      filters.resetFilters();
    });

    resetButtonLs.addEventListener('click', () => {
      localStorage.clear();
      (document.querySelector('.toys-count-num') as HTMLElement).textContent = '0';
      filters.chosenArr = [];
      sortSelect.value = 'alphabet-sort';
      filters.state.sort = 'alphabet-sort';
      filters.resetFilters();
    });

    colorControlsWrapper.addEventListener('click', e => {
      if (e.target.classList.contains('color-controls-item')) {
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
  }

  static async render(): Promise<void> {
    const html = filtersPageHtml;
    await Render.render(html).then(() => {
      this.getLocalstorage();
      this.setEventListeners();
      Utils.handleSearchInput();
      Utils.createSliders();
    });
  }

  static updateState(type, e) {
    switch (type) {
      case 'search':
        const searchInput = document.querySelector('.search-input') as HTMLInputElement;
        const searchQuery = searchInput.value;
        filters.state.query = searchQuery;
        break;

      case 'color':
        const targetColor = e.target.dataset.value
        if (e.target.checked) {
          filters.state.color.push(targetColor)
        } else {
          filters.state.color = filters.state.color.filter(el => el !== targetColor)
        }
        break;
    
      case 'shape':
        const targetShape = e.target.dataset.value;
        if (!e.target.classList.contains('active')) {
          filters.state.shape.push(targetShape)
        } else {
          filters.state.shape = filters.state.shape.filter(el => el !== targetShape)
        }
        e.target.classList.toggle('active');
        break;
    
      case 'size':
        const targetCheckbox = e.target;
        const targetSize = targetCheckbox.dataset.value;
        if (targetCheckbox.checked) {
          filters.state.size.push(targetSize)
        } else {
          filters.state.size = filters.state.size.filter(el => el !== targetSize)
        }
        break;
    
      case 'favorite':
        if (e.target.checked) {
          filters.state.favorite = true;
        } else {
          filters.state.favorite = false;
        }
        break;

      case 'minmax':
        filters.state.minCount = (document.getElementById('count-slider-value-min') as HTMLElement).textContent;
        filters.state.maxCount = (document.getElementById('count-slider-value-max') as HTMLElement).textContent;
        filters.state.minYear = (document.getElementById('year-slider-value-min') as HTMLElement).textContent;
        filters.state.maxYear = (document.getElementById('year-slider-value-max') as HTMLElement).textContent;
        break;
    
      default: //sorting
        const targetSort = e.target.value;
        filters.state.sort = targetSort;
        break;
    }
    
    // console.log(filters.state);
    
    filters.search(filters.initArr)
  }

  static chooseToy(e: Event) {
    const cardItem = e.target.closest('.card-item');
    const cardNum = cardItem.dataset.num;
    const textElement = document.querySelector('.toys-count-num') as HTMLElement;
    if (cardItem.classList.contains('chosen')) {
      cardItem.classList.remove('chosen');
      filters.chosenArr = filters.chosenArr.filter(el => el !== cardNum);
      textElement.textContent--;
    } else {
      if (filters.chosenArr.length >= 20) {
        alert('Извините, все слоты заполнены');
        return;
      }
      cardItem.classList.add('chosen');
      filters.chosenArr.push(cardNum);
      textElement.textContent++;
      localStorage.setItem('webdev163-chosen', JSON.stringify(filters.chosenArr));
    }
  }

  static updateLocalstorage() {
    localStorage.setItem('webdev163-filters', JSON.stringify(filters.state));
  }

  static getLocalstorage() {
    if (localStorage.getItem('webdev163-filters') !== null) {
      const filtersPreviousState = JSON.parse(localStorage.getItem('webdev163-filters'));
      document.querySelector('.sort-select').value = filtersPreviousState.sort;
      filtersPreviousState.color.forEach(el => {
        document.querySelector(`.color-controls-item[data-value=${el}]`).checked = true;
      })
      filtersPreviousState.shape.forEach(el => {
        document.querySelector(`.shape-btn[data-value=${el}]`).classList.add('active');
      })
      filtersPreviousState.size.forEach(el => {
        document.querySelector(`.size-controls-item[data-value=${el}]`).checked = true;
      })
      filtersPreviousState.favorite ? document.querySelector('.favorite-controls-item').checked = true : 0;
      filters.state = filtersPreviousState;
    }
  }
}
