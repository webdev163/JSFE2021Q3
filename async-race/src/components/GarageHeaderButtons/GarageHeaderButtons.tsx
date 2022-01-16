import React, { FC } from 'react';

import './GarageHeaderButtons.scss';

const GarageHeaderButtons: FC = () => {
  return (
    <div>
      <button type="button" onClick={() => document.querySelectorAll('.button-start').forEach(el => (el as HTMLElement).click())}>
        Start all
      </button>
      <button type="button" onClick={() => document.querySelectorAll('.button-stop').forEach(el => (el as HTMLElement).click())}>Stop all</button>
    </div>
  );
};

export default GarageHeaderButtons;
