import { Tree } from '../../components/tree';
import Render from '../../render';
import treePageHtml from './tree.html';
import { TreeState, TreeUpdateStateTypes } from '../../types';

let tree: Tree;
const audio: HTMLAudioElement = new Audio('audio/audio.mp3');

export default class TreePage {
  private static setEventListeners(): void {
    const mainLink = document.querySelector('.main-link') as HTMLElement;
    const toysLink = document.querySelector('.toys-link') as HTMLElement;
    const treeLink = document.querySelector('.tree-link') as HTMLElement;
    const chooseTreeGrid = document.querySelector('.choose-tree-grid') as HTMLElement;
    const chooseBgGrid = document.querySelector('.choose-bg-grid') as HTMLElement;
    const garlandBtnWrapper = document.querySelector('.garland-button-wrapper') as HTMLElement;
    const garlandCheckboxWrapper = document.querySelector('.garland-checkbox-wrapper') as HTMLElement;
    const controlBtnSound = document.querySelector('.control-btn-sound') as HTMLElement;
    const controlBtnSnowflakes = document.querySelector('.control-btn-snowflake') as HTMLElement;
    const treeResetBtn = document.querySelector('.tree-reset-button') as HTMLElement;
    const treeSavetBtn = document.querySelector('.tree-save-button') as HTMLElement;
    const treeDeleteToystBtn = document.querySelector('.tree-delete-toys-button') as HTMLElement;

    mainLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.emptyTreeToys();
      audio.pause();
      document.dispatchEvent(new Event('render-main'));
    });

    toysLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.emptyTreeToys();
      audio.pause();
      document.dispatchEvent(new Event('render-filters'));
    });

    treeLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    });

    chooseTreeGrid.addEventListener('click', (e: Event) => {
      const clicked = e.target as HTMLElement;
      if (clicked.dataset.num) {
        this.updateState('tree', e);
      }
    });

    chooseBgGrid.addEventListener('click', (e: Event) => {
      const clicked = e.target as HTMLElement;
      if (clicked.dataset.num) {
        this.updateState(TreeUpdateStateTypes.background, e);
      }
    });

    garlandBtnWrapper.addEventListener('click', (e: Event) => {
      const clicked = e.target as HTMLElement;
      if (clicked.dataset.value) {
        this.updateState(TreeUpdateStateTypes.lights, e);
      }
    });

    garlandCheckboxWrapper.addEventListener('click', (e: Event) => {
      const clicked = e.target as HTMLElement;
      if (clicked.classList.contains('slide-checkbox')) {
        this.updateState(TreeUpdateStateTypes.lights, e);
      }
    });

    controlBtnSound.addEventListener('click', () => {
      controlBtnSound.classList.toggle('active');
      this.updateState(TreeUpdateStateTypes.sound);
    });

    controlBtnSnowflakes.addEventListener('click', () => {
      controlBtnSnowflakes.classList.toggle('active');
      this.updateState(TreeUpdateStateTypes.snowflakes);
    });

    treeResetBtn.addEventListener('click', () => {
      this.resetSettings();
    });

    treeSavetBtn.addEventListener('click', () => {
      this.saveTree();
    });

    treeDeleteToystBtn.addEventListener('click', () => {
      this.emptyTreeToys();
    });
  }

  public static async render(): Promise<void> {
    const html: string = treePageHtml;
    await Render.render(html).then(() => {
      tree = new Tree();
      this.setEventListeners();
      this.getLocalstorage();
      Tree.generateToys();
      Tree.generateLightropes();
      this.loadTree();
    });
  }

  public static emptyTreeToys(): void {
    const toysWrapper = document.querySelector('#active-toys') as HTMLElement;
    const toysGrid = document.querySelector('.choose-toy-grid') as HTMLElement;
    toysWrapper.innerHTML = '';
    toysGrid.innerHTML = '';
    Tree.generateToys();
  }

  private static updateState(type: string, e?: Event): void {
    switch (type) {
      case TreeUpdateStateTypes.background: {
        const clickedBgNum = (e?.target as HTMLElement).dataset.num;
        (
          document.querySelector('.center-wrapper') as HTMLElement
        ).style.backgroundImage = `url("../assets/img/bg/${clickedBgNum}.jpg")`;
        tree.state.backgroundNum = clickedBgNum as string;
        break;
      }

      case TreeUpdateStateTypes.tree: {
        const clickedTreeNum = (e?.target as HTMLElement).dataset.num;
        (document.querySelector('.tree-img') as HTMLImageElement).src = `../assets/img/tree/${clickedTreeNum}.png`;
        tree.state.treeNum = clickedTreeNum as string;
        break;
      }

      case TreeUpdateStateTypes.lights: {
        if ((e?.target as HTMLElement).classList.contains('slide-checkbox')) {
          const checkbox = e?.target as HTMLInputElement;
          tree.state.isLightsChecked = checkbox.checked;
          const lightropeWrapper = document.querySelector('.lightrope-wrapper');
          lightropeWrapper?.classList.toggle('hidden');
        } else {
          const clickedColor = (e?.target as HTMLElement).dataset.value as string;
          (document.querySelectorAll('.lightrope') as NodeList).forEach(el => {
            const elem = el as HTMLElement;
            elem.className = 'lightrope';
            elem.classList.add(clickedColor);
            tree.state.lights = clickedColor;
          });
        }
        break;
      }

      case TreeUpdateStateTypes.snowflakes: {
        const controlBtnSnowflake = document.querySelector('.control-btn-snowflake') as HTMLElement;
        const snowflakesIntervalId: number = setInterval(() => {
          if (controlBtnSnowflake.classList.contains('active')) {
            Tree.createSnowflake();
          } else {
            clearInterval(snowflakesIntervalId);
          }
        }, 50);
        tree.state.isSnowflakesChecked = tree.state.isSnowflakesChecked ? false : true;
        break;
      }

      case TreeUpdateStateTypes.sound: {
        const controlBtnSound = document.querySelector('.control-btn-sound') as HTMLElement;
        if (controlBtnSound.classList.contains('active')) {
          tree.state.isSoundChecked = true;
          audio.play();
        } else {
          tree.state.isSoundChecked = false;
          audio.pause();
        }
        break;
      }

      default:
        break;
    }

    this.updateLocalstorage();
  }

  private static updateLocalstorage(): void {
    localStorage.setItem('webdev163-tree-settings', JSON.stringify(tree.state));
  }

  private static getLocalstorage(): void {
    if (localStorage.getItem('webdev163-tree-settings') !== null) {
      const previousState: TreeState = JSON.parse(localStorage.getItem('webdev163-tree-settings') || '');
      (
        document.querySelector(`.choose-tree-grid-item[data-num="${previousState.treeNum}"]`) as HTMLInputElement
      ).click();
      (
        document.querySelector(`.choose-bg-grid-item[data-num="${previousState.backgroundNum}"]`) as HTMLInputElement
      ).click();
      if (!previousState.isLightsChecked) {
        (document.querySelector('.slide-checkbox-garland') as HTMLInputElement).click();
      }
      if (previousState.isSnowflakesChecked) {
        (document.querySelector('.control-btn-snowflake') as HTMLInputElement).click();
      }
      if (previousState.isSoundChecked) {
        (document.querySelector('.control-btn-sound') as HTMLInputElement).classList.toggle('active');
        this.updateState('sound');
        audio.play();
      }
      (document.querySelector(`.garland-button-${previousState.lights}`) as HTMLInputElement).click();

      tree.state = previousState;
    }
  }

  private static resetSettings(): void {
    const previousState = tree.state;
    (document.querySelector('.choose-tree-grid-item[data-num="1"]') as HTMLInputElement).click();
    (document.querySelector('.choose-bg-grid-item[data-num="1"]') as HTMLInputElement).click();
    if (!previousState.isLightsChecked) {
      (document.querySelector('.slide-checkbox-garland') as HTMLInputElement).click();
    }
    if (previousState.isSnowflakesChecked) {
      (document.querySelector('.control-btn-snowflake') as HTMLInputElement).click();
    }
    if (previousState.isSoundChecked) {
      (document.querySelector('.control-btn-sound') as HTMLInputElement).classList.toggle('active');
      audio.pause();
      audio.currentTime = 0;
    }
    (document.querySelector('.garland-button-multicolor') as HTMLInputElement).click();
    tree = new Tree();
    localStorage.removeItem('webdev163-tree-settings');
  }

  private static saveTree() {
    const activeToys = (document.getElementById('active-toys') as HTMLElement).innerHTML;
    const activeGridItem = document.querySelector(
      `.done-tree-grid-item[data-num="${tree.state.treeNum}"]`,
    ) as HTMLElement;
    const activeToysWrapper = activeGridItem.querySelector('.active-toys-wrapper') as HTMLElement;
    tree.activeToys[tree.state.treeNum] = activeToys;
    activeToysWrapper.innerHTML = '';
    activeToysWrapper.innerHTML = activeToys;
    localStorage.setItem('webdev163-done-tree', JSON.stringify(tree.activeToys));
    Tree.openPopup();
    this.loadTree();
  }

  private static loadTree() {
    if (localStorage.getItem('webdev163-done-tree') !== null) {
      const activeToys = JSON.parse(localStorage.getItem('webdev163-done-tree') || '') as { [key: string]: string };
      for (const key in activeToys) {
        const activeGridItem = document.querySelector(`.done-tree-grid-item[data-num="${key}"]`) as HTMLElement;
        const activeToysWrapper = document.querySelector(
          `.done-tree-grid-item[data-num="${key}"] .active-toys-wrapper`,
        ) as HTMLElement;
        activeToysWrapper.innerHTML = activeToys[key];
        activeGridItem.addEventListener('click', () => {
          (
            document.querySelector(
              `.choose-tree-grid-item[data-num="${activeGridItem.dataset.num}"]`,
            ) as HTMLInputElement
          ).click();
          (document.querySelector('#active-toys') as HTMLElement).innerHTML = activeToys[key];
          Tree.handleToysDrag();
        });
      }
    }
  }
}
