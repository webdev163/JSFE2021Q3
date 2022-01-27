import React, { FC, useRef, useState, useEffect } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';
import { Actions, CarData, GlobalState } from '../../utils/types';
import { CarItemProps } from './types';

import './CarItem.scss';

const CarItem: FC<CarItemProps> = ({ carName, carColor, carId }) => {
  const actionsContext = React.useContext(ActionsCtx) as Actions;
  const appContext = React.useContext(AppCtx) as GlobalState;
  const [isStartActive, setStartActive] = useState<boolean>(true);
  const [isStopActive, setStopActive] = useState<boolean>(false);
  const isRaceActive: boolean = appContext?.isRaceActive;
  const carsArr = appContext?.carsArr as CarData[];
  useEffect(() => {
    carsArr.forEach((car: CarData) => {
      if (car.id === carId && !car.isEngineOn) {
        setStartActive(true);
      } else if (car.id === carId) {
        setStartActive(false);
      }
      if (car.id === carId && (car.isActive || car.isError) && !isRaceActive) {
        setStopActive(true);
      } else if (car.id === carId) {
        setStopActive(false);
      }
    }) as unknown as CarData[];
  });
  const deleteCar = actionsContext?.deleteCar as (carId: number) => void;
  const selectCar = actionsContext?.selectCar as (carId: number) => void;
  const startEngine = actionsContext?.startEngine as (carId: number, carImg: SVGSVGElement | null) => void;
  const stopEngine = actionsContext?.stopEngine as (carId: number, animated: SVGSVGElement | null) => void;
  const carImg = useRef<SVGSVGElement>(null);
  const animated = carImg.current as SVGSVGElement;

  return (
    <li className="car-item" data-num={carId}>
      <div className="car-buttons-wrapper">
        <button className="btn button-select" type="button" onClick={() => selectCar(carId)} disabled={isRaceActive}>
          Select
        </button>
        <button className="btn button-remove" type="button" onClick={() => deleteCar(carId)} disabled={isRaceActive}>
          Remove
        </button>
        <button
          className="btn button-start"
          type="button"
          onClick={() => {
            startEngine(carId, carImg.current);
          }}
          disabled={!isStartActive}
        >
          A
        </button>
        <button
          className="btn button-stop"
          type="button"
          onClick={() => {
            stopEngine(carId, animated);
          }}
          disabled={!isStopActive}
        >
          B
        </button>
      </div>
      <div className="car-item-body">
        <div className="car-name">{carName}</div>
        <svg ref={carImg} className={`car-img-wrapper car-img-wrapper-${carId}`} width="68" height="34">
          <use className="car-img" style={{ fill: carColor }} href="assets/icons/sprite.svg#car" />
        </svg>
        <svg className="flag-img" width="50" height="50">
          <use className="flag-img-inner" href="assets/icons/sprite.svg#flag" />
        </svg>
      </div>
    </li>
  );
};

export default CarItem;
