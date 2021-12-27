import { Tree } from '../../components/tree';
import Render from '../../render';
import treePageHtml from './tree.html';
import { TreeState, TreeUpdateStateTypes } from '../../types';
import { openPopup } from '../../utils';

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
    const doneTreeGridItems = document.querySelectorAll('.done-tree-grid-item') as NodeList;

    mainLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.emptyTreeToys();
      audio.pause();
      this.snowflakesDisable();
      document.dispatchEvent(new Event('render-main'));
    });

    toysLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.emptyTreeToys();
      audio.pause();
      this.snowflakesDisable();
      document.dispatchEvent(new Event('render-filters'));
    });

    treeLink.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    });

    chooseTreeGrid.addEventListener('click', (e: Event) => {
      const clicked = e.target as HTMLElement;
      if (clicked.dataset.num) {
        this.updateState(TreeUpdateStateTypes.tree, e);
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

    doneTreeGridItems.forEach(el =>
      el.addEventListener('click', (e: Event) => {
        this.handleTreeGridClick(e);
      }),
    );
  }

  public static async render(): Promise<void> {
    const html: string = treePageHtml;
    await Render.render(html).then(() => {
      tree = new Tree();
      this.setEventListeners();
      Tree.generateToys();
      Tree.generateLightropes();
      this.loadTree();
      this.getLocalstorage();
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
        const clickedBgNum = (e?.target as HTMLElement).dataset.num as string;
        (
          document.querySelector('.center-wrapper') as HTMLElement
        ).style.backgroundImage = `url("assets/img/bg/${clickedBgNum}.jpg")`;
        tree.state.backgroundNum = clickedBgNum as string;
        break;
      }

      case TreeUpdateStateTypes.tree: {
        const clickedTreeNum = (e?.target as HTMLElement).dataset.num as string;
        (document.querySelector('.tree-img') as HTMLImageElement).src = `assets/img/tree/${clickedTreeNum}.png`;
        tree.state.treeNum = clickedTreeNum as string;
        break;
      }

      case TreeUpdateStateTypes.lights: {
        if ((e?.target as HTMLElement).classList.contains('slide-checkbox')) {
          const checkbox = e?.target as HTMLInputElement;
          tree.state.isLightsChecked = checkbox.checked;
          const lightropeWrapper = document.querySelector('.lightrope-wrapper') as HTMLElement;
          lightropeWrapper.classList.toggle('hidden');
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
        this.generateSnowflakes();
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
      tree.state = previousState;
      this.updateUI(tree.state.treeNum, tree.state.backgroundNum, tree.state.lights, tree.state.isLightsChecked, tree.state.isSnowflakesChecked, tree.state.isSoundChecked);
    }
  }

  private static resetSettings(): void {
    tree = new Tree();
    localStorage.removeItem('webdev163-tree-settings');
    this.updateUI(null, null, 'multicolor', true, false, false);
  }

  private static updateUI(treeNum: string | null = '1', bgNum: string | null = '1', lights: string, isLightsChecked: boolean, isSnowflakesChecked: boolean, isSoundChecked: boolean): void {
    (
      document.querySelector(`.choose-tree-grid-item[data-num="${treeNum || '1'}"]`) as HTMLInputElement
    ).click();
    (
      document.querySelector(`.choose-bg-grid-item[data-num="${bgNum || '1'}"]`) as HTMLInputElement
    ).click();
    (document.querySelector(`.garland-button-${lights}`) as HTMLInputElement).click();
    if (!isLightsChecked) {
      (document.querySelector('.slide-checkbox-garland') as HTMLInputElement).click();
    }
    const snowflakesBtn = document.querySelector('.control-btn-snowflake') as HTMLInputElement;
    if (isSnowflakesChecked && treeNum && bgNum) {
      snowflakesBtn.classList.add('active');
      this.generateSnowflakes();
    } else {
      snowflakesBtn.classList.remove('active');
    }
    const soundBtn = document.querySelector('.control-btn-sound') as HTMLInputElement;
    if (isSoundChecked) {
      soundBtn.classList.toggle('active');
      if (treeNum && bgNum) {
        this.updateState('sound');
        audio.play();
      }
    } else {
      soundBtn.classList.remove('active');
      audio.pause();
      audio.currentTime = 0;
    }
  }

  private static saveTree(): void {
    const activeToys: string = (document.getElementById('active-toys') as HTMLElement).innerHTML;
    const gridToys: string = (document.querySelector('.choose-toy-grid') as HTMLElement).innerHTML;
    const activeGridItem = document.querySelector(
      `.done-tree-grid-item[data-num="${tree.state.treeNum}"]`,
    ) as HTMLElement;
    const activeToysWrapper = activeGridItem.querySelector('.active-toys-wrapper') as HTMLElement;
    tree.activeToys[tree.state.treeNum] = activeToys;
    tree.gridState[tree.state.treeNum] = gridToys;
    activeToysWrapper.innerHTML = '';
    activeToysWrapper.innerHTML = activeToys;
    localStorage.setItem('webdev163-done-tree', JSON.stringify(tree.activeToys));
    localStorage.setItem('webdev163-grid-state', JSON.stringify(tree.gridState));
    openPopup();
    this.loadTree();
  }

  private static loadTree(): void {
    if (localStorage.getItem('webdev163-done-tree') !== null) {
      const activeToys: { [key: string]: string } = JSON.parse(localStorage.getItem('webdev163-done-tree') || '');
      for (const key in activeToys) {
        const activeGridItem = document.querySelector(`.done-tree-grid-item[data-num="${key}"]`) as HTMLElement;
        const activeToysWrapper = document.querySelector(
          `.done-tree-grid-item[data-num="${key}"] .active-toys-wrapper`,
        ) as HTMLElement;
        activeToysWrapper.innerHTML = activeToys[key];
        activeGridItem.addEventListener('click', () => {
          (document.querySelector('#active-toys') as HTMLElement).innerHTML = activeToys[key];
          const gridState: { [key: string]: string } = JSON.parse(localStorage.getItem('webdev163-grid-state') || '');
          const gridWrapper = document.querySelector('.choose-toy-grid') as HTMLElement;
          gridWrapper.innerHTML = '';
          gridWrapper.innerHTML = gridState[key];
          Tree.handleToysDrag();
        });
      }
    }
  }

  private static handleTreeGridClick(e: Event): void {
    const clicked = e.target as HTMLElement;
    const clickedNum: string = (clicked.closest('.done-tree-grid-item') as HTMLElement).dataset.num as string;
    const activeToys: { [key: string]: string } = JSON.parse(localStorage.getItem('webdev163-done-tree') || '');
    (document.querySelector(`.choose-tree-grid-item[data-num="${clickedNum}"]`) as HTMLInputElement).click();
    if (clickedNum in activeToys) {
      return;
    } else {
      this.emptyTreeToys();
    }
  }

  private static snowflakesDisable() {
    if (tree.state.isSnowflakesChecked) {
      (document.querySelector('.control-btn-snowflake') as HTMLInputElement).click();
      tree.state.isSnowflakesChecked = true;
      this.updateLocalstorage();
    }
  }

  private static generateSnowflakes() {
    const controlBtnSnowflake = document.querySelector('.control-btn-snowflake') as HTMLElement;
    const snowflakesIntervalId: number = setInterval((): void => {
      if (controlBtnSnowflake.classList.contains('active')) {
        Tree.createSnowflake();
      } else {
        clearInterval(snowflakesIntervalId);
      }
    }, 50);
  }
}
