import React, { Component } from 'react';
import GarageHeader from '../../components/GarageHeader';
import GarageBody from '../../components/GarageBody';
import AsyncRaceService from '../../services/AsyncRaceService';
import {
  CARS_PER_PAGE_COUNT,
  GENERATE_CARS_VALUE,
  CAR_NAMES_ARR_ITEMS_MIN_INDEX,
  CAR_NAMES_ARR_ITEMS_MAX_INDEX,
} from '../../utils/constants';
import { CarData, GlobalState, PromiseFulfilledResult, WinnerData } from '../../utils/types';
import { ActionsCtx } from '../../utils/context';
import carBrands from '../../assets/data/carBrands';
import carModels from '../../assets/data/carModels';
import { getRandomInt, getRandomColor } from '../../utils/utils';
import WinnerModal from '../../components/WinnerModal';

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
      isModalActive: false,
      winner: null,
      isRaceActive: false,
      winnersArr: [],
      totalWinnersCount: null,
    };
  }

  componentDidMount(): void {
    const { currentPage } = this.state;
    this.getCars(currentPage, CARS_PER_PAGE_COUNT);
    this.getWinners(1, 10);
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
    this.deleteWinner(carId).then(() => { this.getWinners(1, 10) }).catch(() => {});
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
    this.getWinners(1, 10);
  };

  startEngine = async (carId: number, carImg: SVGSVGElement) => {
    this.updateCarsArr(carId, 'isEngineOn', true);
    return AsyncRaceService.startEngine(carId).then(async ({ velocity, distance }) => {
      this.updateCarsArr(carId, 'isActive', true);
      this.handleAnimation(carId, carImg, velocity, distance);
      this.enableDriveMode(carId);
    });
  };

  enableDriveMode = async (carId: number) => {
    return AsyncRaceService.driveMode(carId).then(response => {
      const result = response as unknown as {
        success?: boolean;
        carId?: number;
        err?: string;
        velocity?: number;
      };
      if (!result.success) {
        this.updateCarsArr(carId, 'isActive', false);
        this.updateCarsArr(carId, 'isError', true);
      }
    });
  };

  handleAnimation = (carId: number, carImg: SVGSVGElement, velocity: number, distance: number) => {
    let startTime: number;
    let animationId: number;
    const target = carImg;
    const width = (document.querySelector('.car-item-body') as HTMLElement).clientWidth - target.clientWidth;
    const animationTime = distance / velocity;
    this.updateCarsArr(carId, 'animationTime', animationTime);
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
        const count = (width / animationTime) * currentTime;
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
      this.updateCarsArr(carId, 'isActive', false);
      this.updateCarsArr(carId, 'isEngineOn', false);
      this.updateCarsArr(carId, 'isError', false);
      carImg.style.removeProperty('transform');
    });
  };

  startRace = () => {
    // eslint-disable-next-line no-console
    console.clear();
    this.setState({ isRaceActive: true })
    const { carsArr } = this.state;
    Promise.all(
      carsArr.map(car => {
        this.updateCarsArr(car.id, 'isEngineOn', true);
        return AsyncRaceService.startEngine(car.id);
      }),
    ).then(response => {
      carsArr.forEach((car, ndx) => {
        const carImg = document.querySelector(`.car-img-wrapper-${car.id}`) as SVGSVGElement;
        const { velocity, distance } = response[ndx];
        this.updateCarsArr(car.id, 'velocity', velocity);
        this.updateCarsArr(car.id, 'isActive', true);
        this.handleAnimation(car.id, carImg, velocity, distance);
      });
      Promise.allSettled(
        carsArr.map(car => {
          return new Promise((resolve, reject) => {
            return AsyncRaceService.driveMode(car.id).then(resp => {
              const result = resp as unknown as {
                success?: boolean;
                carId?: number;
                err?: string;
                velocity?: number;
              };
              if (!result.success) {
                this.updateCarsArr(car.id, 'isActive', false);
                this.updateCarsArr(car.id, 'isError', true);
                const style = 'font-weight: bold;';
                // eslint-disable-next-line no-console
                console.log(`%c Car ${car.name} stopped suddenly!`, style);
                reject();
              }
              const carId = car.id;
              const carVelocity = car.velocity;
              resolve({ carId, carVelocity });
            });
          });
        }),
      ).then(async res => {
        const { carsArr } = this.state;
        const result = res.filter(res => res.status === 'fulfilled').map(el => (el as PromiseFulfilledResult).value).sort((a, b) => b.carVelocity - a.carVelocity)[0];
        const winner = await AsyncRaceService.getCar(result.carId);
        const winnerId = winner.id;
        const winnerName = winner.name;
        this.togglePopup();
        const { animationTime } = carsArr.filter(el => el.id === winnerId)[0];
        const animationTimeInSeconds = Math.round(animationTime as number / 1000 * 100) / 100
        this.setState({ winner: { id: winnerId, name: winnerName, time: animationTimeInSeconds }, isRaceActive: false });
        this.addWinner(winnerId, animationTimeInSeconds);
      });
    });
  };

  createWinner = async (id: number, wins: number, time: number): Promise<WinnerData> => {
    return await AsyncRaceService.createWinner(id, wins, time);
  };

  updateWinner = async (id: number, wins: number, time: number): Promise<void> => {
    await AsyncRaceService.updateWinner(id, wins, time);
    this.getWinners(1, 10);
  };

  deleteWinner = async (id: number): Promise<void> => {
    await AsyncRaceService.deleteWinner(id);
  };

  addWinner = (carId: number, currentTime: number) => {
    this.createWinner(carId, 1, currentTime).catch(async () => {
      const winnerData = await this.getWinner(carId);
      const { wins, time } = winnerData;
      const totalWins = wins + 1;
      this.updateWinner(carId, totalWins, currentTime < time ? currentTime : time);
    }).finally(() => {
      this.getWinners(1, 10);
    })
  }

  getWinners = async (page: number, limit: number, sort: string = 'id', order: string = '') => {
    const response = await AsyncRaceService.getWinners(page, limit, sort, order);
    const { winnersArr, totalWinnersCount } = response;
    this.setState({ winnersArr, totalWinnersCount });
  }

  getWinner = async (carId: number): Promise<WinnerData> => {
    const response = await AsyncRaceService.getWinner(carId);
    return response;
  }

  resetCars = () => {
    const { carsArr } = this.state;
    Promise.all(
      carsArr.map(car => {
        const carImg = document.querySelector(`.car-img-wrapper-${car.id}`) as SVGSVGElement;
        return this.stopEngine(car.id, carImg);
      }),
    );
  };

  generateCars = () => {
    const arr = [];
    for (let i = 0; i < GENERATE_CARS_VALUE; i += 1) {
      const name = `${carBrands[getRandomInt(CAR_NAMES_ARR_ITEMS_MIN_INDEX, CAR_NAMES_ARR_ITEMS_MAX_INDEX)]} ${carModels[getRandomInt(CAR_NAMES_ARR_ITEMS_MIN_INDEX, CAR_NAMES_ARR_ITEMS_MAX_INDEX)]}`;
      const color = getRandomColor();
      arr.push({ name, color });
    }
    Promise.all(
      arr.map(el => {
        return new Promise(async resolve => {
          await AsyncRaceService.createCar(el.name, el.color)
          resolve(null);
        })
      }),
    ).then(() => {
      const { currentPage } = this.state;
      this.getCars(currentPage, CARS_PER_PAGE_COUNT);
    })
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

  updateCarsArr = (carId: number, carProperty: string, carValue: boolean | number) => {
    const { carsArr } = this.state;
    const newCarsArr = carsArr.map(car => {
      const newCar = car;
      if (car.id === carId) {
        newCar[carProperty] = carValue;
      }
      return newCar;
    });
    this.setState({ carsArr: newCarsArr });
  };

  togglePopup = () => {
    const { isModalActive } = this.state;
    this.setState({ isModalActive: !isModalActive });
  }

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
          togglePopup: this.togglePopup,
        }}
      >
        <div className={`garage-wrapper ${isVisible ? '' : 'hidden'}`}>
          <GarageHeader />
          <GarageBody />
          <WinnerModal />
        </div>
      </ActionsCtx.Provider>
    );
  }
}
