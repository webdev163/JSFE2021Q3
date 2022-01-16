import React, { FC } from 'react';
import CarCreateForm from '../CarCreateForm';
import CarUpdateForm from '../CarUpdateForm';
import GarageHeaderButtons from '../GarageHeaderButtons';

import './GarageHeader.scss';

const GarageHeader: FC = () => {
  return (
    <div className="header-wrapper">
      <CarCreateForm />
      <CarUpdateForm />
      <GarageHeaderButtons />
    </div>
  );
};

export default GarageHeader;
