import { TreeState } from '../types';

export class Tree {
  public state: TreeState;
  public activeToys: { [key: string]: string }

  constructor() {
    this.state = {
      treeNum: '1',
      backgroundNum: '1',
      lights: 'multicolor',
      isLightsChecked: true,
      isSnowflakesChecked: false,
      isSoundChecked: false,
    };
    this.activeToys = {}
  }
}
