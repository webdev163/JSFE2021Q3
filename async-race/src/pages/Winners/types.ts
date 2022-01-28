import { GlobalState } from '../../utils/types';

export interface WinnersProps {
  isVisible: boolean;
  updateState: (state: GlobalState) => void;
  toPrevPage: (page: string) => void;
  toNextPage: (page: string) => void;
}
