import React, { FC, useState, useEffect } from 'react';
import { WinnerData, CarData } from '../../utils/types';
import { getCarData } from '../../utils/utils';

import './WinnersTableItem.scss';

interface Props {
  carId: number;
  number: number;
  wins: number;
  time: number;
  winnersArr: WinnerData[];
}

const WinnersTableItem: FC<Props> = ({ carId, number, wins, time, winnersArr }) => {
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
