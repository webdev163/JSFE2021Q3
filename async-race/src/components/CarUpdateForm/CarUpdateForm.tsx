import React, { FC, useState, useEffect } from 'react';
import { CarData } from '../../utils/types';
import AppCtx from '../../utils/context';

import './CarUpdateForm.scss';

interface Props {
  updateCar: (name: string, color: string, carId: number) => void;
}

const CarUpdateForm: FC<Props> = ({ updateCar }) => {
  const appContext = React.useContext(AppCtx);
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
          updateCar(carName, carColor, carId);
        }}
        disabled={isDisabled}
      >
        Update
      </button>
    </div>
  );
};

export default CarUpdateForm;
