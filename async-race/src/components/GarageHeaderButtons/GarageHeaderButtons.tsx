import React, { FC } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';

import './GarageHeaderButtons.scss';

const GarageHeaderButtons: FC = () => {
  const actionsContext = React.useContext(ActionsCtx);
  const appContext = React.useContext(AppCtx);
  const startRace = actionsContext?.startRace as () => void;
  const resetCars = actionsContext?.resetCars as () => void;
  const generateCars = actionsContext?.generateCars as () => void;
  const isRaceActive = appContext?.isRaceActive;
  return (
    <div className="btn-header-wrapper">
      <button className="btn header-button" type="button" onClick={() => startRace()} disabled={isRaceActive}>
        Start race
      </button>
      <button className="btn header-button" type="button" onClick={() => resetCars()} disabled={isRaceActive}>
        Reset cars
      </button>
      <button className="btn header-button" type="button" onClick={() => generateCars()} disabled={isRaceActive}>
        Generate cars
      </button>
    </div>
  );
};

export default GarageHeaderButtons;
