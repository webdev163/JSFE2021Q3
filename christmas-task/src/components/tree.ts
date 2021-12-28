import { TreeState, ToysData } from '../types';
import {
  LIGHTS_ROTATION_VALUES_ARR,
  LIGHTS_TRANSLATE_VALUES_ARR,
  LIGHTS_COUNT_VALUES_ARR,
  LIGHTROPES_COUNT,
  CHOOSE_LIMIT,
  DRAGGABLE_TOYS_ZINDEX_VALUE,
  VALUE_IN_PERCENTS_FACTOR,
  SNOWFLAKES_MAX_SIZE,
  SNOWFLAKES_LIFETIME_VALUE,
} from '../constants';
import Data from '../data';

export class Tree {
  public state: TreeState;
  public activeToys: { [key: string]: string };
  public gridState: { [key: string]: string };

  constructor() {
    this.state = {
      treeNum: '1',
      backgroundNum: '1',
      lights: 'multicolor',
      isLightsChecked: true,
      isSnowflakesChecked: false,
      isSoundChecked: false,
    };
    this.activeToys = {};
    this.gridState = {};
  }

  public static generateLightropes(): void {
    const lightropesWrapper = document.querySelector('.lightrope-wrapper') as HTMLElement;
    for (let i = 0; i < LIGHTROPES_COUNT; i++) {
      const wrapper: HTMLElement = document.createElement('UL');
      wrapper.className = 'lightrope';
      for (let j = 0; j < LIGHTS_COUNT_VALUES_ARR[i]; j++) {
        const lightItem: HTMLElement = document.createElement('LI');
        lightItem.style.transform = `rotate(${LIGHTS_ROTATION_VALUES_ARR[i][j]}deg) translateY(${LIGHTS_TRANSLATE_VALUES_ARR[i][j]}px)`;
        wrapper.append(lightItem);
      }
      lightropesWrapper.append(wrapper);
    }
  }

  public static createSnowflake(): void {
    const snowFlake = document.createElement('i') as HTMLElement;
    const centerWrapper = document.querySelector('.center-wrapper') as HTMLElement;
    snowFlake.classList.add('fas');
    snowFlake.classList.add('fa-snowflake');
    snowFlake.style.left = String(Math.random() * window.innerWidth + 'px');
    snowFlake.style.animationDuration = String(Math.random() * 3 + 2 + 's');
    snowFlake.style.opacity = String(Math.random());
    snowFlake.style.height = snowFlake.style.width = String(
      Math.random() * SNOWFLAKES_MAX_SIZE + SNOWFLAKES_MAX_SIZE + 'px',
    );

    centerWrapper.appendChild(snowFlake);

    setTimeout((): void => {
      snowFlake.remove();
    }, SNOWFLAKES_LIFETIME_VALUE);
  }

  public static async generateToys(): Promise<void> {
    let chosenArr: Array<string> = [];
    const toysGrid = document.querySelector('.choose-toy-grid') as HTMLElement;
    const json: ToysData = await Data.getJson();

    if (localStorage.getItem('webdev163-chosen') !== null) {
      chosenArr = JSON.parse(localStorage.getItem('webdev163-chosen') || '') as Array<string>;
    }
    const chosenDataArr: ToysData = chosenArr.length
      ? chosenArr.map(el => json[Number(el) - 1])
      : json.slice(0, CHOOSE_LIMIT);
    for (let i = 0; i < CHOOSE_LIMIT; i++) {
      const div: HTMLDivElement = document.createElement('div');
      div.className = 'choose-toy-grid-item';
      div.dataset.item = String(i);
      if (chosenDataArr[i]) {
        const counter: HTMLParagraphElement = document.createElement('p');
        counter.className = 'toy-count';
        counter.textContent = chosenDataArr[i].count as string;
        div.append(counter);
        for (let j = 0; j < Number(chosenDataArr[i].count); j++) {
          const img: HTMLImageElement = document.createElement('img');
          img.className = 'toy-img';
          img.src = `assets/img/toys/${chosenDataArr[i].num}.png`;
          img.dataset.imgnum = String(i);
          img.draggable = false;
          div.append(img);
        }
      }
      toysGrid.append(div);
    }
    this.handleToysDrag();
  }

  public static handleToysDrag(): void {
    const toys = document.querySelectorAll('#active-toys .toy-img, .choose-toy-grid .toy-img') as NodeList;
    toys.forEach(el =>
      el.addEventListener('mousedown', (e: Event) => {
        const clicked = el as HTMLElement;
        const clickedNum = clicked.dataset.imgnum as string;
        const clickedParent = document.querySelector(`[data-item="${clickedNum}"]`) as HTMLElement;

        this.updateToyCount(clickedParent);

        if (clicked.classList.contains('toy-img')) {
          const mouseevent = e as MouseEvent;
          const shiftX: number = mouseevent.clientX - clicked.getBoundingClientRect().left;
          const shiftY: number = mouseevent.clientY - clicked.getBoundingClientRect().top;
          let isDroppable = false;
          const moveAt = (pageX: number, pageY: number): void => {
            clicked.style.left = String(((pageX - shiftX) / window.innerWidth) * VALUE_IN_PERCENTS_FACTOR + '%');
            clicked.style.top = String(((pageY - shiftY) / window.innerHeight) * VALUE_IN_PERCENTS_FACTOR + '%');
          };
          const onMouseMove = (event: MouseEvent): void => {
            clicked.style.cursor = "not-allowed";
            moveAt(event.pageX, event.pageY);
            clicked.hidden = true;
            const elemBelow = document.elementFromPoint(event.pageX, event.pageY) as Element;
            clicked.hidden = false;
            if (!elemBelow) return;
            isDroppable = elemBelow.closest('.droppable') ? true : false;
            if (isDroppable) {
              clicked.style.cursor = "copy";
            }
          };

          clicked.ondragstart = (): boolean => {
            return false;
          };
          clicked.style.position = 'absolute';
          clicked.style.zIndex = String(DRAGGABLE_TOYS_ZINDEX_VALUE);
          (document.querySelector('#active-toys') as HTMLElement).append(clicked);

          onMouseMove(mouseevent);

          document.addEventListener('mousemove', onMouseMove);

          document.addEventListener(
            'mouseup',
            () => {
              document.removeEventListener('mousemove', onMouseMove);
              clicked.onmouseup = null;

              if (!isDroppable) {
                clicked.remove();
                clickedParent?.append(clicked);
                clicked.removeAttribute('style');
              }
              this.updateToyCount(clickedParent);
              clicked.style.cursor = "move";
            },
            { once: true },
          );
        }
      }),
    );
  }

  private static updateToyCount(toyWrapper: HTMLElement) {
    const currentToyCount: number = toyWrapper.querySelectorAll('img').length;
    const toyCounter = toyWrapper.querySelector('.toy-count') as HTMLElement;
    toyCounter.textContent = String(currentToyCount);
  }
}
