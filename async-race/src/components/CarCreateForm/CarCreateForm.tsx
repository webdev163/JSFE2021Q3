import React, { FC, useState } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';

import './CarCreateForm.scss';

const CarCreateForm: FC = () => {
  const [carName, setName] = useState('');
  const [carColor, setColor] = useState('#000000');
  const actionsContext = React.useContext(ActionsCtx);
  const appContext = React.useContext(AppCtx);
  const isRaceActive = appContext?.isRaceActive;
  const createCar = actionsContext?.createCar as (carName: string, carColor: string) => void;
  return (
    <div className="create-form-wrapper">
      <input type="text" className="text-input" value={carName} onChange={e => setName(e.target.value)} disabled={isRaceActive} />
      <input type="color" className="color-input" value={carColor} onChange={e => setColor(e.target.value)} disabled={isRaceActive}/>
      <button className="btn create-btn" type="button" onClick={() => createCar(carName, carColor)} disabled={isRaceActive}>
        Create
      </button>
    </div>
  );
};

export default CarCreateForm;
