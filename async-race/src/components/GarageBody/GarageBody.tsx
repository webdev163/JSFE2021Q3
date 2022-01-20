import React, { FC } from 'react';
import CarsList from '../CarsList';
import { AppCtx } from '../../utils/context';
import GaragePagination from '../GaragePagination';
import { GlobalState } from '../../utils/types';

import './GarageBody.scss';

const GarageBody: FC = () => {
  const appContext = React.useContext(AppCtx) as GlobalState;
  return (
    <div className="garage-body-wrapper">
      <h2>Garage ({appContext?.totalCarsCount})</h2>
      <GaragePagination />
      <h3>Page #{appContext?.currentPage}</h3>
      <CarsList />
    </div>
  );
};

export default GarageBody;
