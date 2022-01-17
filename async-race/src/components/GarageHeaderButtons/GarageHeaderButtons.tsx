import React, { FC } from 'react';
import { ActionsCtx } from '../../utils/context';

import './GarageHeaderButtons.scss';

const GarageHeaderButtons: FC = () => {
  const actionsContext = React.useContext(ActionsCtx);
  const startRace = actionsContext?.startRace as () => void;
  const resetCars = actionsContext?.resetCars as () => void;
  const generateCars = actionsContext?.generateCars as () => void;
  return (
    <div className="btn-header-wrapper">
      <button className="btn" type="button" onClick={() => startRace()}>
        Start race
      </button>
      <button className="btn" type="button" onClick={() => resetCars()}>
        Reset cars
      </button>
      <button className="btn" type="button" onClick={() => generateCars()}>
        Generate cars
      </button>
    </div>
  );
};

export default GarageHeaderButtons;
