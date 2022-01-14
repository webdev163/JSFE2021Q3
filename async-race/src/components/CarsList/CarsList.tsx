import React, { FC } from 'react';
import CarItem from '../CarItem';
import { CarData } from '../../utils/types';

import './CarsList.scss';

interface Props {
  carsItems: CarData[];
}

const CarsList: FC<Props> = ({ carsItems }) => {
  const renderCars = carsItems.map((car: CarData) => {
    return <CarItem key={car.id} carName={car.name} carColor={car.color} />;
  });
  return <ul className="cars-list">{renderCars}</ul>;
};

export default CarsList;
