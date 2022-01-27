import React, { FC, useState, useEffect } from 'react';
import GarageHeader from '../../components/GarageHeader';
import GarageBody from '../../components/GarageBody';
import AsyncRaceService from '../../services/AsyncRaceService';
import {
  CARS_PER_PAGE_COUNT,
  GENERATE_CARS_VALUE,
  CAR_NAMES_ARR_ITEMS_MIN_INDEX,
  CAR_NAMES_ARR_ITEMS_MAX_INDEX,
  WINNERS_PER_PAGE_COUNT,
  MS_IN_SECOND,
  ROUND_UP_FACTOR,
  INITIAL_COLOR,
} from '../../utils/constants';
import {
  CarData,
  GlobalState,
  PromiseFulfilledResult,
  WinnerData,
  StartStopEngineResponse,
  CarRaceData,
  GetWinnersResponse,
  GenerateCarsData,
} from '../../utils/types';
import { ActionsCtx } from '../../utils/context';
import carBrands from '../../assets/data/carBrands';
import carModels from '../../assets/data/carModels';
import { getRandomInt, getRandomColor, createWinner, deleteWinner, getWinner } from '../../utils/utils';
import WinnerModal from '../../components/WinnerModal';

import './Garage.scss';

interface Props {
  isVisible: boolean;
  updateState: (state: GlobalState) => void;
}

const Garage: FC<Props> = ({ isVisible, updateState }) => {
  const [carsArr, setCarsArr] = useState<CarData[] | never[]>([]);
  const [totalCarsCount, updateTotalCarsCount] = useState<number | null>(null);
  const [totalPagesCount, updateTotalPagesCount] = useState<number | null>(null);
  const [currentPage, updateCurrentPage] = useState<number>(1);
  const [selectedCar, updateSelectedCar] = useState<CarData>({ name: '', color: INITIAL_COLOR, id: 0 });
  const [isModalActive, toggleModal] = useState<boolean>(false);
  const [winner, updateWinner] = useState<{ id: number; name: string; time: number } | null>(null);
  const [isRaceActive, toggleRaceActive] = useState<boolean>(false);
  const [winnersArr, updateWinnersArr] = useState<WinnerData[] | never[]>([]);
  const [totalWinnersCount, updateTotalWinnersCount] = useState<number | null>(null);

  const getCars = async (page: number, limit: number): Promise<void> => {
    const { carsArr: newCarsArr, totalCarsCount: newTotalCarsCount } = await AsyncRaceService.getCars(page, limit);
    const newTotalPagesCount: number = Math.ceil(newTotalCarsCount / CARS_PER_PAGE_COUNT);
    setCarsArr(newCarsArr);
    updateTotalCarsCount(newTotalCarsCount);
    updateTotalPagesCount(newTotalPagesCount);
  };

  const getWinners = async (page: number, limit: number, sort = 'id', order = ''): Promise<void> => {
    const response = (await AsyncRaceService.getWinners(page, limit, sort, order)) as GetWinnersResponse;
    const { winnersArr: newWinnersArr, totalWinnersCount: newTotalWinnersCount } = response;
    updateWinnersArr(newWinnersArr);
    updateTotalWinnersCount(newTotalWinnersCount);
  };

  useEffect(() => {
    getCars(currentPage, CARS_PER_PAGE_COUNT);
    getWinners(1, WINNERS_PER_PAGE_COUNT);
  }, []);

  useEffect(() => {
    updateState({
      carsArr,
      totalCarsCount,
      totalPagesCount,
      currentPage,
      selectedCar,
      isModalActive,
      winner,
      isRaceActive,
      winnersArr,
      totalWinnersCount,
    });
  }, [
    carsArr,
    totalCarsCount,
    totalPagesCount,
    currentPage,
    selectedCar,
    isModalActive,
    winner,
    isRaceActive,
    winnersArr,
    totalWinnersCount,
  ]);

  const updateCarsArrFunc = (carId: number, carProperty: string, carValue: boolean | number): void => {
    const newCarsArr: CarData[] = carsArr.map((car: CarData) => {
      const newCar: CarData = car;
      if (car.id === carId) {
        newCar[carProperty] = carValue;
      }
      return newCar;
    });
    setCarsArr(newCarsArr);
  };

  const createCar = async (carName: string, carColor: string): Promise<void> => {
    const carData = (await AsyncRaceService.createCar(carName, carColor)) as CarData;
    setCarsArr([...carsArr, carData]);
    getCars(currentPage, CARS_PER_PAGE_COUNT);
  };

  const deleteCar = async (carId: number): Promise<void> => {
    await AsyncRaceService.deleteCar(carId);
    getCars(currentPage, CARS_PER_PAGE_COUNT);
    deleteWinner(carId)
      .then(() => {
        getWinners(1, WINNERS_PER_PAGE_COUNT);
      })
      .catch(() => {});
  };

  const selectCar = async (carId: number): Promise<void> => {
    const carData = (await AsyncRaceService.getCar(carId)) as CarData;
    updateSelectedCar(carData);
  };

  const updateCar = async (name: string, color: string, carId: number): Promise<void> => {
    await AsyncRaceService.updateCar(name, color, carId);
    const index: number = carsArr.findIndex((el: CarData) => el.id === carId);
    updateSelectedCar({ name: '', color: INITIAL_COLOR, id: 0 });
    setCarsArr([...carsArr.slice(0, index), { name, color, id: carId }, ...carsArr.slice(index + 1)]);
    getWinners(1, WINNERS_PER_PAGE_COUNT);
  };

  const enableDriveMode = async (carId: number): Promise<void> => {
    return AsyncRaceService.driveMode(carId).then((response: unknown) => {
      const result = response as {
        success?: boolean;
        carId?: number;
        err?: string;
      };
      if (!result.success) {
        updateCarsArrFunc(carId, 'isActive', false);
        updateCarsArrFunc(carId, 'isError', true);
      }
    });
  };

  const handleAnimation = (carId: number, carImg: SVGSVGElement, velocity: number, distance: number): number => {
    let startTime: number;
    let animationId: number;
    const target: SVGSVGElement = carImg;
    const width: number = (document.querySelector('.car-item-body') as HTMLElement).clientWidth - target.clientWidth;
    const animationTime: number = distance / velocity;
    updateCarsArrFunc(carId, 'animationTime', animationTime);
    const step = (timestamp: number): void => {
      let isActive = false;
      carsArr.forEach((car: CarData) => {
        if (car.id === carId) {
          isActive = car.isActive as boolean;
        }
      });
      if (isActive) {
        if (!startTime) startTime = timestamp;
        const currentTime: number = timestamp - startTime;
        const count: number = (width / animationTime) * currentTime;
        target.style.transform = `translateX(${count}px)`;
        if (currentTime < animationTime) {
          animationId = window.requestAnimationFrame(step);
        }
      }
    };

    animationId = window.requestAnimationFrame(step);
    return animationId;
  };

  const startEngine = async (carId: number, carImg: SVGSVGElement): Promise<void> => {
    updateCarsArrFunc(carId, 'isEngineOn', true);
    return AsyncRaceService.startEngine(carId).then(async ({ velocity, distance }) => {
      updateCarsArrFunc(carId, 'isActive', true);
      handleAnimation(carId, carImg, velocity, distance);
      enableDriveMode(carId);
    });
  };

  const stopEngine = async (carId: number, carImg: SVGSVGElement): Promise<void> => {
    AsyncRaceService.stopEngine(carId).then(() => {
      updateCarsArrFunc(carId, 'isActive', false);
      updateCarsArrFunc(carId, 'isEngineOn', false);
      updateCarsArrFunc(carId, 'isError', false);
      carImg.style.removeProperty('transform');
    });
  };

  const updateWinnerFunc = async (id: number, wins: number, time: number): Promise<void> => {
    await AsyncRaceService.updateWinner(id, wins, time);
    getWinners(1, WINNERS_PER_PAGE_COUNT);
  };

  const addWinner = (carId: number, currentTime: number): void => {
    createWinner(carId, 1, currentTime)
      .catch(async (): Promise<void> => {
        const winnerData = (await getWinner(carId)) as WinnerData;
        const { wins, time } = winnerData;
        const totalWins: number = wins + 1;
        updateWinnerFunc(carId, totalWins, currentTime < time ? currentTime : time);
      })
      .finally((): void => {
        getWinners(1, WINNERS_PER_PAGE_COUNT);
      });
  };

  const togglePopup = (): void => {
    toggleModal(!isModalActive);
  };

  const startRace = () => {
    // eslint-disable-next-line no-console
    console.clear();
    toggleRaceActive(true);
    Promise.all(
      carsArr.map((car: CarData) => {
        updateCarsArrFunc(car.id, 'isEngineOn', true);
        return AsyncRaceService.startEngine(car.id);
      }),
    ).then((response: StartStopEngineResponse[]) => {
      carsArr.forEach((car: CarData, ndx: number) => {
        const carImg = document.querySelector(`.car-img-wrapper-${car.id}`) as SVGSVGElement;
        const { velocity, distance } = response[ndx];
        updateCarsArrFunc(car.id, 'velocity', velocity);
        updateCarsArrFunc(car.id, 'isActive', true);
        handleAnimation(car.id, carImg, velocity, distance);
      });
      Promise.allSettled(
        carsArr.map((car: CarData) => {
          return new Promise((resolve, reject) => {
            return AsyncRaceService.driveMode(car.id).then((resp: unknown) => {
              const result = resp as {
                success?: boolean;
                carId?: number;
                err?: string;
              };
              if (!result.success) {
                updateCarsArrFunc(car.id, 'isActive', false);
                updateCarsArrFunc(car.id, 'isError', true);
                const style = 'font-weight: bold;';
                // eslint-disable-next-line no-console
                console.log(`%c Car ${car.name} stopped suddenly!`, style);
                reject();
              }
              const carId = car.id as number;
              const carVelocity = car.velocity as number;
              resolve({ carId, carVelocity });
            });
          });
        }),
      ).then(async (res: PromiseSettledResult<unknown>[]): Promise<void> => {
        const result: CarRaceData[] = res
          .filter((resp: PromiseSettledResult<unknown>) => resp.status === 'fulfilled')
          .map(el => (el as PromiseFulfilledResult).value)
          .sort((a: CarRaceData, b: CarRaceData) => b.carVelocity - a.carVelocity);
        if (result.length) {
          const newWinner = (await AsyncRaceService.getCar(result[0].carId)) as CarData;
          const winnerId: number = newWinner.id;
          const winnerName: string = newWinner.name;
          togglePopup();
          const { animationTime } = carsArr.filter((el: CarData) => el.id === winnerId)[0];
          const animationTimeInSeconds: number =
            Math.round(((animationTime as number) / MS_IN_SECOND) * ROUND_UP_FACTOR) / ROUND_UP_FACTOR;
          updateWinner({ id: winnerId, name: winnerName, time: animationTimeInSeconds });
          toggleRaceActive(false);
          addWinner(winnerId, animationTimeInSeconds);
        } else {
          toggleRaceActive(false);
        }
      });
    });
  };

  const resetCars = (): void => {
    Promise.all(
      carsArr.map((car: CarData) => {
        const carImg = document.querySelector(`.car-img-wrapper-${car.id}`) as SVGSVGElement;
        return stopEngine(car.id, carImg);
      }),
    );
  };

  const generateCars = (): void => {
    const arr: GenerateCarsData[] = [];
    for (let i = 0; i < GENERATE_CARS_VALUE; i += 1) {
      const name = `${carBrands[getRandomInt(CAR_NAMES_ARR_ITEMS_MIN_INDEX, CAR_NAMES_ARR_ITEMS_MAX_INDEX)]} ${
        carModels[getRandomInt(CAR_NAMES_ARR_ITEMS_MIN_INDEX, CAR_NAMES_ARR_ITEMS_MAX_INDEX)]
      }`;
      const color: string = getRandomColor();
      arr.push({ name, color });
    }
    Promise.all(arr.map((el: GenerateCarsData) => AsyncRaceService.createCar(el.name, el.color))).then(() => {
      getCars(currentPage, CARS_PER_PAGE_COUNT);
    });
  };

  const toPrevPage = (): void => {
    if (currentPage > 1) {
      const newPage: number = currentPage - 1;
      getCars(newPage, CARS_PER_PAGE_COUNT);
      updateCurrentPage(newPage);
    }
  };

  const toNextPage = (): void => {
    if (totalPagesCount && currentPage < totalPagesCount) {
      const newPage: number = currentPage + 1;
      getCars(newPage, CARS_PER_PAGE_COUNT);
      updateCurrentPage(newPage);
    }
  };

  return (
    <ActionsCtx.Provider
      value={{
        createCar,
        updateCar,
        selectCar,
        deleteCar,
        startEngine,
        stopEngine,
        startRace,
        resetCars,
        generateCars,
        toPrevPage,
        toNextPage,
        togglePopup,
      }}
    >
      <div className={`garage-wrapper ${isVisible ? '' : 'hidden'}`}>
        <GarageHeader />
        <GarageBody />
        <WinnerModal />
      </div>
    </ActionsCtx.Provider>
  );
};

export default Garage;
