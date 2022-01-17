import React, { FC, useRef } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';
import { CarId, CarData } from '../../utils/types';

import './CarItem.scss';

interface Props {
  carName: string;
  carColor: string;
  carId: number;
}

const CarItem: FC<Props> = ({ carName, carColor, carId }) => {
  const actionsContext = React.useContext(ActionsCtx);
  const appContext = React.useContext(AppCtx);
  let isStartActive = true;
  let isStopActive = false;
  const carsArr = appContext?.carsArr as CarData[];
  carsArr.forEach(car => {
    if (car.id === carId && !car.isEngineOn) {
      isStartActive = true;
    } else if (car.id === carId) {
      isStartActive = false;
    }
    if (car.id === carId && (car.isActive || car.isError)) {
      isStopActive = true;
    } else if (car.id === carId) {
      isStopActive = false;
    }
  }) as unknown as CarData[];
  const deleteCar = actionsContext?.deleteCar as CarId;
  const selectCar = actionsContext?.selectCar as CarId;
  const startEngine = actionsContext?.startEngine as (carId: number, carImg: SVGSVGElement | null) => void;
  const stopEngine = actionsContext?.stopEngine as (carId: number, animated: SVGSVGElement | null) => void;
  const carImg = useRef<SVGSVGElement>(null);

  const animated = carImg.current as SVGSVGElement;

  return (
    <li className="car-item" data-num={carId}>
      <div className="car-buttons-wrapper">
        <button className="btn button-select" type="button" onClick={() => selectCar(carId)}>
          Select
        </button>
        <button className="btn button-remove" type="button" onClick={() => deleteCar(carId)}>
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
        <svg ref={carImg} className={`car-img-wrapper-${carId}`} width="68" height="34">
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
