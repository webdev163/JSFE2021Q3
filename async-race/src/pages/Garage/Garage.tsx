import React, { Component } from 'react';
import GarageHeader from '../../components/GarageHeader';
import GarageBody from '../../components/GarageBody';
import AsyncRaceService from '../../services/AsyncRaceService';
import {
  CARS_PER_PAGE_COUNT,
  MILLISECONDS_IN_SECOND,
  GENERATE_CARS_VALUE,
  CAR_NAMES_ARR_ITEMS_MIN_INDEX,
  CAR_NAMES_ARR_ITEMS_MAX_INDEX,
} from '../../utils/constants';
import { CarData, GlobalState } from '../../utils/types';
import { ActionsCtx } from '../../utils/context';
import carBrands from '../../assets/data/carBrands';
import carModels from '../../assets/data/carModels';
import { getRandomInt, getRandomColor } from '../../utils/utils';

import './Garage.scss';

interface Props {
  isVisible: boolean;
  updateState: (state: GlobalState) => void;
}

export default class Garage extends Component<Props, GlobalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      carsArr: [],
      totalCarsCount: null,
      totalPagesCount: null,
      currentPage: 1,
      selectedCar: { name: '', color: '#000000', id: 0 },
    };
  }

  componentDidMount(): void {
    const { currentPage } = this.state;
    this.getCars(currentPage, CARS_PER_PAGE_COUNT);
  }

  componentDidUpdate(): void {
    const { updateState } = this.props;
    updateState(this.state);
  }

  async getCars(page: number, limit: number): Promise<void> {
    const { carsArr, totalCarsCount } = await AsyncRaceService.getCars(page, limit);
    const totalPagesCount = Math.ceil(totalCarsCount / CARS_PER_PAGE_COUNT);
    this.setState({ carsArr, totalCarsCount, totalPagesCount });
  }

  createCar = async (carName: string, carColor: string): Promise<void> => {
    const { carsArr, currentPage } = this.state;
    const carData = (await AsyncRaceService.createCar(carName, carColor)) as CarData;
    this.setState({ carsArr: [...carsArr, carData] });
    this.getCars(currentPage, CARS_PER_PAGE_COUNT);
  };

  deleteCar = async (carId: number): Promise<void> => {
    await AsyncRaceService.deleteCar(carId);
    const { currentPage } = this.state;
    this.getCars(currentPage, CARS_PER_PAGE_COUNT);
  };

  selectCar = async (carId: number): Promise<void> => {
    const carData = await AsyncRaceService.getCar(carId);
    this.setState({ selectedCar: carData });
  };

  updateCar = async (name: string, color: string, carId: number): Promise<void> => {
    await AsyncRaceService.updateCar(name, color, carId);
    const { carsArr } = this.state;
    const index = carsArr.findIndex(el => el.id === carId);
    this.setState({
      selectedCar: { name: '', color: '#000000', id: 0 },
      carsArr: [...carsArr.slice(0, index), { name, color, id: carId }, ...carsArr.slice(index + 1)],
    });
  };

  startEngine = async (carId: number, carImg: SVGSVGElement) => {
    AsyncRaceService.startEngine(carId).then(async ({ velocity }) => {
      const { carsArr } = this.state;
      const newCarsArr = carsArr.map(car => {
        const newCar = car;
        if (car.id === carId) {
          newCar.isActive = true;
        }
        return newCar;
      }) as unknown as CarData[];
      this.setState({ carsArr: newCarsArr });

      const animationId = this.handleAnimation(carId, carImg, velocity);
      AsyncRaceService.driveMode(carId).then(response => {
        const result = response as unknown as {
          success?: boolean;
          carId?: number;
          err?: string;
          velocity?: number;
        };
        if (!result.success) {
          let carName = '';
          const newArr = carsArr.map(car => {
            const newCar = car;
            if (car.id === carId) {
              newCar.isActive = false;
              carName = car.name;
            }
            return newCar;
          }) as unknown as CarData[];
          const style = 'font-weight: bold;';
          // eslint-disable-next-line no-console
          console.log(`%c Car ${carName} stopped suddenly!`, style);
          this.setState({ carsArr: newArr });
          window.cancelAnimationFrame(animationId);
        }
      });
    });
  };

  handleAnimation = (carId: number, carImg: SVGSVGElement, velocity: number) => {
    let startTime: number;
    let animationId: number;
    const target = carImg;
    const distance = (document.querySelector('.car-item-body') as HTMLElement).clientWidth - target.clientWidth;
    const animationTime = (distance / velocity) * MILLISECONDS_IN_SECOND;

    const step = (timestamp: number) => {
      let isActive = false;
      const { carsArr } = this.state;
      carsArr.forEach(car => {
        if (car.id === carId) {
          isActive = car.isActive as boolean;
        }
      });
      if (isActive) {
        if (!startTime) startTime = timestamp;
        const currentTime = timestamp - startTime;
        const count = (distance / animationTime) * currentTime;
        target.style.transform = `translateX(${count}px)`;
        if (currentTime < animationTime) {
          animationId = window.requestAnimationFrame(step);
        }
      }
    };

    animationId = window.requestAnimationFrame(step);
    return animationId;
  };

  stopEngine = async (carId: number, carImg: SVGSVGElement) => {
    AsyncRaceService.stopEngine(carId).then(() => {
      const { carsArr } = this.state;
      const newCarsArr = carsArr.map(car => {
        const newCar = car;
        if (car.id === carId) {
          newCar.isActive = false;
        }
        return newCar;
      }) as unknown as CarData[];
      this.setState({ carsArr: newCarsArr });
      carImg.style.removeProperty('transform');
    });
  };

  startRace = () => {
    // eslint-disable-next-line no-console
    console.clear();
    document.querySelectorAll('.button-start').forEach(el => (el as HTMLElement).click());
  };

  resetCars = () => {
    document.querySelectorAll('.button-stop').forEach(el => (el as HTMLElement).click());
  };

  generateCars = () => {
    for (let i = 0; i < GENERATE_CARS_VALUE; i += 1) {
      const name = `${carBrands[getRandomInt(CAR_NAMES_ARR_ITEMS_MIN_INDEX, CAR_NAMES_ARR_ITEMS_MAX_INDEX)]} ${
        carModels[getRandomInt(CAR_NAMES_ARR_ITEMS_MIN_INDEX, CAR_NAMES_ARR_ITEMS_MAX_INDEX)]
      }`;
      const color = getRandomColor();
      this.createCar(name, color);
    }
  };

  toPrevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      this.getCars(newPage, CARS_PER_PAGE_COUNT);
      this.setState({ currentPage: newPage });
    }
  };

  toNextPage = () => {
    const { currentPage, totalPagesCount } = this.state;
    if (totalPagesCount && currentPage < totalPagesCount) {
      const newPage = currentPage + 1;
      this.getCars(newPage, CARS_PER_PAGE_COUNT);
      this.setState({ currentPage: newPage });
    }
  };

  render() {
    const { isVisible } = this.props;
    return (
      <ActionsCtx.Provider
        value={{
          createCar: this.createCar,
          updateCar: this.updateCar,
          selectCar: this.selectCar,
          deleteCar: this.deleteCar,
          startEngine: this.startEngine,
          stopEngine: this.stopEngine,
          startRace: this.startRace,
          resetCars: this.resetCars,
          generateCars: this.generateCars,
          toPrevPage: this.toPrevPage,
          toNextPage: this.toNextPage,
        }}
      >
        <div className={`garage-wrapper ${isVisible ? '' : 'hidden'}`}>
          <GarageHeader />
          <GarageBody />
        </div>
      </ActionsCtx.Provider>
    );
  }
}
