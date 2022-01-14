import React, { FC } from 'react';

import './CarUpdateForm.scss';

const CarUpdateForm: FC = () => {
  return (
    <div className="update-form-wrapper">
      <input type="text" className="text-input" name="car-name" />
      <input type="color" className="color-input" name="car-color" />
      <button className="btn update-btn" type="button" name="update-button">
        Update
      </button>
    </div>
  );
};

export default CarUpdateForm;
