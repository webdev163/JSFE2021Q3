export interface CarData {
  name: string,
  color: string,
  id: number
}

export interface GlobalState {
  carsArr: CarData[];
  totalCarsCount: number | null;
  totalPagesCount: number | null;
  currentPage: number;
  selectedCar: CarData;
}