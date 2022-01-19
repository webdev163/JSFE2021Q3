export type CarId = (carId: number) => void;

export interface CarData {
  name: string,
  color: string,
  id: number,
  isActive?: boolean,
  isEngineOn?: boolean,
  isError?: boolean,
  velocity?: number,
  animationTime?: number,
}

export interface WinnerData {
  id: number,
  wins: number,
  time: number,
}

export interface GlobalState {
  carsArr: CarData[];
  totalCarsCount: number | null;
  totalPagesCount: number | null;
  currentPage: number;
  selectedCar: CarData;
  isModalActive: boolean;
  winner: {id: number, name: string, time: number} | null;
  isRaceActive: boolean,
  winnersArr: WinnerData[],
  totalWinnersCount: number | null,
}

export interface WinnersState {
  winnersArr: WinnerData[];
  totalWinnersCount: number | null;
  currentPage: number;
}

export interface PromiseFulfilledResult {
  status: string;
  value: { carId: number, carVelocity: number };
}

export interface Actions {
  createCar: (carName: string, carColor: string) => void;
  updateCar: (name: string, color: string, carId: number) => void;
  deleteCar: (carId: number) => void;
  selectCar: (carId: number) => void;
  startEngine: (carId: number, carImg: SVGSVGElement) => void;
  stopEngine: (carId: number, carImg: SVGSVGElement) => void;
  startRace: () => void;
  resetCars: () => void;
  generateCars: () => void;
  toPrevPage: () => void;
  toNextPage: () => void;
  togglePopup: () => void;
}