import { GlobalState } from '../../utils/types';

export interface ContainerProps {
  handleToggleView: () => void;
  isWinnersVisible: boolean;
  updateState: (state: GlobalState) => void;
}
