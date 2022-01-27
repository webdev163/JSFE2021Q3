import { WinnerData } from '../../utils/types';

export interface WinnersTableItemProps {
  carId: number;
  number: number;
  wins: number;
  time: number;
  winnersArr: WinnerData[];
}
