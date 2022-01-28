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
  carsArr?: CarData[];
  totalCarsCount?: number | null;
  totalPagesCount?: number | null;
  currentPage?: number;
  selectedCar?: CarData;
  isModalActive?: boolean;
  winner?: {id: number, name: string, time: number} | null;
  isRaceActive?: boolean,
  winnersArr?: WinnerData[],
  totalWinnersCount?: number | null,
  currentWinnersPage?: number;
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
  toPrevPage: (page: string) => void;
  toNextPage: (page: string) => void;
  togglePopup: () => void;
}

export interface GetCarsResponse {
  carsArr: CarData[];
  totalCarsCount: number;
}

export interface GetWinnersResponse {
  winnersArr: WinnerData[];
  totalWinnersCount: number;
}

export interface StartStopEngineResponse {
  velocity: number;
  distance: number;
}
export interface CarRaceData {
  carId: number;
  carVelocity: number
}

export interface DriveSuccess {
  success: boolean;
}

export interface DriveError {
  carId: number;
  err: string;
}

export interface GenerateCarsData {
  name: string;
  color: string
}

export enum SortTypes {
  id = 'id',
  wins = 'wins',
  time = 'time',
}

export enum OrderTypes {
  asc = 'ASC',
  desc = 'DESC',
}

export enum Pages {
  garage = 'garage',
  winners = 'winners',
}