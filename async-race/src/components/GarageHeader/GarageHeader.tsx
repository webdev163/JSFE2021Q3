import React, { FC } from 'react';
import CarCreateForm from '../CarCreateForm';
import CarUpdateForm from '../CarUpdateForm';

import './GarageHeader.scss';

interface Props {
  createCar: (carName: string, carColor: string) => void;
  updateCar: (name: string, color: string, carId: number) => void;
}

const GarageHeader: FC<Props> = ({ createCar, updateCar }) => {
  return (
    <div className="header-wrapper">
      <CarCreateForm createCar={createCar} />
      <CarUpdateForm updateCar={updateCar} />
    </div>
  );
};

export default GarageHeader;
