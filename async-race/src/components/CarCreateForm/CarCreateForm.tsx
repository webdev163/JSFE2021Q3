import React, { FC } from 'react';

import './CarCreateForm.scss';

const CarCreateForm: FC = () => {
  return (
    <div className="create-form-wrapper">
      <input type="text" className="text-input" name="car-name" />
      <input type="color" className="color-input" name="car-color" />
      <button className="btn create-btn" type="button" name="create-button">
        Create
      </button>
    </div>
  );
};

export default CarCreateForm;
