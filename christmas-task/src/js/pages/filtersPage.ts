import Render from '../render';
import { Filters } from '../filters';
import filtersPageHtml from './filtersPage.html';
import Utils from '../utils';

const filters = new Filters();

export default class FiltersPage extends Filters {
  static setEventListeners(): void {
    const sortSelect = document.querySelector('.sort-select') as HTMLElement;
    const resetButton = document.querySelector('.reset-button') as HTMLElement;
    const colorControlsWrapper = document.querySelector('.color-controls-wrapper') as HTMLElement;
    const dropdown = document.querySelector('.custom-dropdown') as HTMLElement;
    const select = document.querySelector('.sort-select') as HTMLSelectElement;
    const shapeControlsInner = document.querySelector('.shape-controls-inner') as HTMLElement;
    const sizeControlsArr = document.querySelectorAll('.checkbox-size-inner') as NodeList;
    const checkboxFavorite = document.querySelector('.checkbox-favorite-inner') as HTMLElement;

    sortSelect.addEventListener('mousedown', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.add('active');
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
  }

  static async render(): Promise<void> {
    const html = filtersPageHtml;
    await Render.render(html).then(() => {
      this.setEventListeners();
      Utils.handleSearchInput();
      Utils.createSliders();
    });
  }

  static updateState(type, e) {
    switch (type) {
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
    
      default:
        const targetSort = e.target.value;
        filters.state.sort = targetSort;
        break;
    }
    
    // console.log(filters.state);
    
    filters.color(filters.initArr)
  }
}
