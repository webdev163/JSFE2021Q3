import React, { Component } from 'react';
import GarageHeader from '../../components/GarageHeader';
import GarageBody from '../../components/GarageBody';
import AsyncRaceService from '../../services/AsyncRaceService';
import { CARS_PER_PAGE_COUNT } from '../../utils/constants';
import { CarData, GlobalState } from '../../utils/types';
import { ActionsCtx } from '../../utils/context';

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
    this.getCars();
  }

  componentDidUpdate(): void {
    const { updateState } = this.props;
    updateState(this.state);
  }

  async getCars(): Promise<void> {
    const { carsArr, totalCarsCount } = await AsyncRaceService.getCars();
    const totalPagesCount = Math.ceil(totalCarsCount / CARS_PER_PAGE_COUNT);
    this.setState({ carsArr, totalCarsCount, totalPagesCount });
  }

  createCar = async (carName: string, carColor: string): Promise<void> => {
    const { carsArr } = this.state;
    const carData = (await AsyncRaceService.createCar(carName, carColor)) as CarData;
    this.setState({ carsArr: [...carsArr, carData] });
    this.getCars();
  };

  deleteCar = async (carId: number): Promise<void> => {
    await AsyncRaceService.deleteCar(carId);
    this.getCars();
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
      const newCarsArr = (carsArr.map(car => {
        if (car.id === carId) {
          car.isActive = true;
        }
        return car;
      })) as unknown as CarData[];
      this.setState({ carsArr: newCarsArr })

      const animationId = this.handleAnimation(carId, carImg, velocity);
      AsyncRaceService.driveMode(carId).then(response => {
        const result = response as unknown as {
          success?: boolean;
          carId?: number;
          err?: string;
          velocity?: number;
        };
        if (!result.success) {
          console.log(`Car ${carId} stopped suddenly!`);
          const newCarsArr = (carsArr.map(car => {
            if (car.id === carId) {
              car.isActive = false;
            }
            return car;
          })) as unknown as CarData[];
          this.setState({ carsArr: newCarsArr })
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
    const animationTime = (distance / velocity) * 1000;

    const step = (timestamp: number) => {
      let isActive = false;
      const { carsArr } = this.state;
      carsArr.map(car => {
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
    }

    animationId = window.requestAnimationFrame(step);
    
    return animationId;
  };

  stopEngine = async (carId: number, carImg: SVGSVGElement) => {
    AsyncRaceService.stopEngine(carId).then(() => {
      const { carsArr } = this.state;
      const newCarsArr = (carsArr.map(car => {
        if (car.id === carId) {
          car.isActive = false;
        }
        return car;
      })) as unknown as CarData[];
      this.setState({ carsArr: newCarsArr })
      carImg.style.removeProperty('transform');
    });
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
