import React, { FC } from 'react';

import './CarItem.scss';

interface Props {
  carName: string;
  carColor: string;
}

const CarItem: FC<Props> = ({ carName, carColor }) => {
  return (
    <li className="car-item">
      <div className="car-buttons-wrapper">
        <button className="btn button-select" type="button">
          Select
        </button>
        <button className="btn button-remove" type="button">
          Remove
        </button>
        <button className="btn button-start" type="button">
          A
        </button>
        <button className="btn button-stop" type="button">
          B
        </button>
      </div>
      <div className="car-item-body">
        <div className="car-name">{carName}</div>
        <svg width="68" height="34">
          <use className="car-img" style={{ fill: carColor }} href="assets/icons/sprite.svg#car" />
        </svg>
        <svg className="flag-img" width="50" height="50">
          <use className="flag-img-inner" href="assets/icons/sprite.svg#flag" />
        </svg>
      </div>
    </li>
  );
};

export default CarItem;
