import React, { FC } from 'react';
import CarsList from '../CarsList';
import AppCtx from '../../utils/context';

import './GarageBody.scss';

type Props = {
  deleteCar: (carId: number) => void;
  selectCar: (carId: number) => void;
};

const GarageBody: FC<Props> = ({ deleteCar, selectCar }) => {
  const appContext = React.useContext(AppCtx);
  return (
    <div className="garage-body-wrapper">
      <h2>Garage ({appContext?.totalCarsCount})</h2>
      <h3>Page #{appContext?.currentPage}</h3>
      <CarsList deleteCar={deleteCar} selectCar={selectCar} />
    </div>
  );
};

export default GarageBody;
