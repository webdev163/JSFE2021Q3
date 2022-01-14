import React, { FC } from 'react';
import GarageHeader from '../../components/GarageHeader';
import GarageBody from '../../components/GarageBody';

import './Garage.scss';

type Props = {
  isVisible: boolean;
};

const Garage: FC<Props> = ({ isVisible }) => {
  return (
    <div className={`garage-wrapper ${isVisible ? '' : 'hidden'}`}>
      <GarageHeader />
      <GarageBody />
    </div>
  );
};

export default Garage;
