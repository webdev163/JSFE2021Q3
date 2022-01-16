import React, { FC, useState, useEffect } from 'react';
import { CarData } from '../../utils/types';
import { AppCtx, ActionsCtx } from '../../utils/context';

import './CarUpdateForm.scss';

const CarUpdateForm: FC = () => {
  const appContext = React.useContext(AppCtx);
  const actionsContext = React.useContext(ActionsCtx);
  const selectedCar = appContext?.selectedCar as CarData;
  const [carName, setName] = useState(selectedCar.name);
  const [carColor, setColor] = useState(selectedCar.color);
  const [carId, setId] = useState(selectedCar.id);

  useEffect(() => {
    setName(selectedCar.name);
    setColor(selectedCar.color);
    setId(selectedCar.id);
  }, [selectedCar]);

  const isDisabled = carId === 0;

  return (
    <div className="update-form-wrapper">
      <input
        type="text"
        className="text-input"
        disabled={isDisabled}
        value={carName}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="color"
        className="color-input"
        disabled={isDisabled}
        value={carColor}
        onChange={e => setColor(e.target.value)}
      />
      <button
        className="btn update-btn"
        type="button"
        onClick={() => {
          actionsContext?.updateCar(carName, carColor, carId);
        }}
        disabled={isDisabled}
      >
        Update
      </button>
    </div>
  );
};

export default CarUpdateForm;
