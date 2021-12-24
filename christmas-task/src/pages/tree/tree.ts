import { Tree } from '../../components/tree';
import Render from '../../render';
import treePageHtml from './tree.html';

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

    mainLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.dispatchEvent(new Event('render-main'));
    })

    toysLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.dispatchEvent(new Event('render-filters'));
    })

    treeLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
    })

    chooseTreeGrid.addEventListener('click', (e) => {
      const clicked = e.target as HTMLElement;
      if (clicked.dataset.num) {
        this.updateState('tree', e);
      }
    })

    chooseBgGrid.addEventListener('click', (e) => {
      const clicked = e.target as HTMLElement;
      if (clicked.dataset.num) {
        this.updateState('background', e);
      }
    })

    garlandBtnWrapper.addEventListener('click', (e) => {
      const clicked = e.target as HTMLElement;
      if (clicked.dataset.value) {
        this.updateState('lights', e);
      }
    })

    garlandCheckboxWrapper.addEventListener('click', (e) => {
      const clicked = e.target as HTMLElement;
      if (clicked.classList.contains('slide-checkbox')) {
        this.updateState('lights', e);
      }
    })

    controlBtnSound.addEventListener('click', () => {
      controlBtnSound.classList.toggle('active');
      this.updateState('sound');
    })

    controlBtnSnowflakes.addEventListener('click', () => {
      controlBtnSnowflakes.classList.toggle('active');
      this.updateState('snowflakes');
    })
  }

  public static async render(): Promise<void> {
    const html: string = treePageHtml;
    await Render.render(html).then(() => {
      tree = new Tree;
      this.setEventListeners();
      this.generateToys();
    });
  }

  private static updateState(type: string, e?: Event): void {
    switch (type) {
      case 'background':
        const clickedBgNum = (e?.target as HTMLElement).dataset.num;
        (document.querySelector('.center-wrapper') as HTMLElement).style.backgroundImage = `url("../assets/img/bg/${clickedBgNum}.jpg")`
        tree.state.backgroundNum = clickedBgNum as string;
        break;
    
      case 'tree':
        const clickedTreeNum = (e?.target as HTMLElement).dataset.num;
        (document.querySelector('.tree-img') as HTMLElement).style.backgroundImage = `url("../assets/img/tree/${clickedTreeNum}.png")`
        tree.state.treeNum = clickedTreeNum as string;
        break;

      case 'lights':
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
            elem.classList.add(clickedColor)
            tree.state.lights = clickedColor;
          })
        }
        break;

      case 'snowflakes':
        const controlBtnSnowflake = document.querySelector('.control-btn-snowflake') as HTMLElement
        const snowflakesIntervalId: number = setInterval(() => {
          if (controlBtnSnowflake.classList.contains('active')) {
          tree.state.isSnowflakesChecked = true;
          this.createSnowflake()
          } else {
            tree.state.isSnowflakesChecked = false;
            clearInterval(snowflakesIntervalId);
          }
        }, 50);
        break;

      case 'sound':
        const controlBtnSound = document.querySelector('.control-btn-sound') as HTMLElement
        if (controlBtnSound.classList.contains('active')) {
          tree.state.isSoundChecked = true;
          audio.play();
        } else {
          tree.state.isSoundChecked = false;
          audio.pause();
        }
        break;
    
      default:
        break;
    }
  }

  private static generateToys() {

  }

  private static createSnowflake(): void {
    const snowFlake = document.createElement('i') as HTMLElement;
    const centerWrapper = document.querySelector('.center-wrapper') as HTMLElement;
    snowFlake.classList.add('fas');
    snowFlake.classList.add('fa-snowflake');
    snowFlake.style.left = Math.random() * window.innerWidth + 'px';
    snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowFlake.style.opacity = String(Math.random());
    snowFlake.style.height = snowFlake.style.width = Math.random() * 10 + 10 + 'px';

    centerWrapper.appendChild(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000)
  }
}
