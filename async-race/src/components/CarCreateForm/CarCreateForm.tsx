import React, { FC, useState } from 'react';

import './CarCreateForm.scss';

interface Props {
  createCar: (carName: string, carColor: string) => void;
}

const CarCreateForm: FC<Props> = ({ createCar }) => {
  const [carName, setName] = useState('');
  const [carColor, setColor] = useState('#000000');
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
