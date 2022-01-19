import React, { FC, useState, useEffect } from 'react';
import AsyncRaceService from '../../services/AsyncRaceService';
import { WinnerData } from '../../utils/types';

import './WinnersTableItem.scss';

interface Props {
  carId: number;
  number: number;
  wins: number;
  time: number;
  winnersArr: WinnerData[];
}

const WinnersTableItem: FC<Props> = ({ carId, number, wins, time, winnersArr}) => {
  const [winnerData, setWinnerData] = useState({});

  useEffect(() => {
    let isMounted = true;
    getWinnerData(carId).then(data => {
      if (isMounted) {
        const { name, color } = data;
        setWinnerData({ name, color });
      }
    })
    return () => { isMounted = false };
  }, [winnersArr]);

  const getWinnerData = async (carId: number) => {
    return await AsyncRaceService.getCar(carId);
  }

  return (
    <tr>
      <td>{number}</td>
      <td>
        <svg width="68" height="34">
          <use style={{ fill: winnerData['color'] }} href="assets/icons/sprite.svg#car" />
        </svg>
      </td>
      <td>{winnerData['name']}</td>
      <td>{wins}</td>
      <td>{time}</td>
    </tr>
  );
};

export default WinnersTableItem;
