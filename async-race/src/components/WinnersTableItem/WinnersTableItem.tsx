import React, { FC, useState, useEffect } from 'react';
import { CarData } from '../../utils/types';
import { getCarData } from '../../utils/utils';
import { WinnersTableItemProps } from './types';

import './WinnersTableItem.scss';

const WinnersTableItem: FC<WinnersTableItemProps> = ({ carId, number, wins, time, winnersArr }) => {
  const [winnerData, setWinnerData] = useState<{ name: string; color: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    getCarData(carId).then((data: CarData) => {
      if (isMounted) {
        const { name, color } = data;
        setWinnerData({ name, color });
      }
    });
    return () => {
      isMounted = false;
    };
  }, [winnersArr]);

  return (
    <tr>
      <td>{number}</td>
      <td>
        <svg width="68" height="34">
          <use style={{ fill: winnerData?.color }} href="assets/icons/sprite.svg#car" />
        </svg>
      </td>
      <td>{winnerData?.name}</td>
      <td>{wins}</td>
      <td>{time}</td>
    </tr>
  );
};

export default WinnersTableItem;
