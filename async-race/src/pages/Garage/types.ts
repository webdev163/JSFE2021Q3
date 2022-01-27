import { GlobalState } from '../../utils/types';

export interface GarageProps {
  isVisible: boolean;
  updateState: (state: GlobalState) => void;
}
