import React, { FC } from 'react';
import CarItem from '../CarItem';
import { CarData, GlobalState } from '../../utils/types';
import { AppCtx } from '../../utils/context';

import './CarsList.scss';

const CarsList: FC = () => {
  const appContext = React.useContext(AppCtx) as GlobalState;
  const renderCars = appContext?.carsArr?.map((car: CarData) => {
    return <CarItem key={car.id} carName={car.name} carColor={car.color} carId={car.id} />;
  }) as JSX.Element[];
  return <ul className="cars-list">{renderCars}</ul>;
};

export default CarsList;
