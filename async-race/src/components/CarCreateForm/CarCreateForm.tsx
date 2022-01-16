import React, { FC, useState } from 'react';
import { ActionsCtx } from '../../utils/context';

import './CarCreateForm.scss';

const CarCreateForm: FC = () => {
  const [carName, setName] = useState('');
  const [carColor, setColor] = useState('#000000');
  const actionsContext = React.useContext(ActionsCtx);
  const createCar = actionsContext?.createCar as (carName: string, carColor: string) => void;
  return (
    <div className="create-form-wrapper">
      <input type="text" className="text-input" value={carName} onChange={e => setName(e.target.value)} />
      <input type="color" className="color-input" value={carColor} onChange={e => setColor(e.target.value)} />
      <button className="btn create-btn" type="button" onClick={() => createCar(carName, carColor)}>
        Create
      </button>
    </div>
  );
};

export default CarCreateForm;
