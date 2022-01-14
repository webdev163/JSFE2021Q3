import React, { FC } from 'react';
import CarCreateForm from '../CarCreateForm';
import CarUpdateForm from '../CarUpdateForm';

import './GarageHeader.scss';

const GarageHeader: FC = () => {
  return (
    <div className="header-wrapper">
      <CarCreateForm />
      <CarUpdateForm />
    </div>
  );
};

export default GarageHeader;
