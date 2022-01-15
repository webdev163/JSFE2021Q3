import React, { FC } from 'react';
import CarItem from '../CarItem';
import { CarData } from '../../utils/types';
import AppCtx from '../../utils/context';

import './CarsList.scss';

interface Props {
  deleteCar: (carId: number) => void;
  selectCar: (carId: number) => void;
}

const CarsList: FC<Props> = ({ deleteCar, selectCar }) => {
  const appContext = React.useContext(AppCtx);
  const renderCars = appContext?.carsArr.map((car: CarData) => {
    return (
      <CarItem
        key={car.id}
        carName={car.name}
        carColor={car.color}
        carId={car.id}
        deleteCar={deleteCar}
        selectCar={selectCar}
      />
    );
  });
  return <ul className="cars-list">{renderCars}</ul>;
};

export default CarsList;
