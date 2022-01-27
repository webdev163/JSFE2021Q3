import React, { FC, useState } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';
import { Actions, GlobalState } from '../../utils/types';
import { INITIAL_COLOR } from '../../utils/constants';

import './CarCreateForm.scss';

const CarCreateForm: FC = () => {
  const [carName, setName] = useState<string>('');
  const [carColor, setColor] = useState<string>(INITIAL_COLOR);
  const actionsContext = React.useContext(ActionsCtx) as Actions;
  const appContext = React.useContext(AppCtx) as GlobalState;
  const isRaceActive = appContext?.isRaceActive as boolean;
  const createCar = actionsContext?.createCar as (carName: string, carColor: string) => void;
  return (
    <div className="create-form-wrapper">
      <input
        type="text"
        className="text-input"
        value={carName}
        onChange={e => setName(e.target.value)}
        disabled={isRaceActive}
      />
      <input
        type="color"
        className="color-input"
        value={carColor}
        onChange={e => setColor(e.target.value)}
        disabled={isRaceActive}
      />
      <button
        className="btn create-btn"
        type="button"
        onClick={() => {
          createCar(carName, carColor);
          setName('');
          setColor(INITIAL_COLOR);
        }}
        disabled={isRaceActive}
      >
        Create
      </button>
    </div>
  );
};

export default CarCreateForm;
