export type CarId = (carId: number) => void;

export interface CarData {
  name: string,
  color: string,
  id: number,
  isActive?: boolean,
}

export interface GlobalState {
  carsArr: CarData[];
  totalCarsCount: number | null;
  totalPagesCount: number | null;
  currentPage: number;
  selectedCar: CarData;
}

export interface Actions {
  createCar: (carName: string, carColor: string) => void;
  updateCar: (name: string, color: string, carId: number) => void;
  deleteCar: (carId: number) => void;
  selectCar: (carId: number) => void;
  startEngine: (carId: number, carImg: SVGSVGElement) => void;
  stopEngine: (carId: number, carImg: SVGSVGElement) => void;
}