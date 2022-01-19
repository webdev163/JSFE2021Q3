import React, { FC, useState, useEffect } from 'react';
import AsyncRaceService from '../../services/AsyncRaceService';
import { WinnerData } from '../../utils/types';
import WinnersTableItem from '../../components/WinnersTableItem';
import { AppCtx } from '../../utils/context';

import './Winners.scss';

interface Props {
  isVisible: boolean;
}

const WinnersPage: FC<Props> = ({ isVisible }) => {
  const appContext = React.useContext(AppCtx);
  const winnersArr = appContext?.winnersArr as WinnerData[];
  const totalWinnersCount = appContext?.totalWinnersCount as number;
  const totalPagesCount = Math.ceil(totalWinnersCount / 10);
  const [currentWinnersPage, setCurrentWinnersPage] = useState<number>(1);
  const [currentWinnersArr, setCurrentWinnersArr] = useState<WinnerData[]>(winnersArr);
  const [currentTotalPagesCount, setCurrentTotalPagesCount] = useState(totalPagesCount);
  const [sortType, setSortType] = useState('id');
  const [orderType, setOrderType] = useState('ASC');
  const isPrevDisabled = currentWinnersPage < 2;
  const isNextEnabled = currentWinnersPage < currentTotalPagesCount;

  useEffect(() => {
    getWinners(currentWinnersPage, 10, sortType, orderType);
  }, [currentWinnersPage, winnersArr, sortType, orderType]);

  useEffect(() => {
    updateTotalPagesCount();
  }, [totalWinnersCount]);

  const winnerItems = currentWinnersArr?.map((winner: WinnerData, ndx: number) => {
    const number = (ndx + 1) + ((currentWinnersPage - 1) * 10);
    return <WinnersTableItem key={winner.id} carId={winner.id} number={number} wins={winner.wins} time={winner.time} winnersArr={currentWinnersArr} />;
  });

  const toPrevPage = () => {
    if (currentWinnersPage > 1) {
      const newPage = currentWinnersPage - 1;
      getWinners(newPage, 10, sortType, orderType);
      setCurrentWinnersPage(newPage);
    }
  }

  const toNextPage = () => {
    if (currentWinnersPage < currentTotalPagesCount) {
      const newPage = currentWinnersPage + 1;
      getWinners(newPage, 10);
      setCurrentWinnersPage(newPage);
    }
  }

  const getWinners = async (page: number, limit: number, sort: string = 'id', order: string = '') => {
    const response = await AsyncRaceService.getWinners(page, limit, sort, order);
    setCurrentWinnersArr(response['winnersArr']);
  }

  const updateTotalPagesCount = () => {
    setCurrentTotalPagesCount(Math.ceil(totalWinnersCount / 10));
  }

  const handleLinkClick = (type: string) => {
    setSortType(type);
    setOrderType(orderType === 'ASC' ? 'DESC' : 'ASC');
    getWinners(currentWinnersPage, 10, sortType, orderType);
  }

  const getWinsArrow = () => {
    if (sortType === 'wins' && orderType === 'ASC') {
      return '↑';
    } else if (sortType === 'wins' && orderType === 'DESC') {
      return '↓';
    }
    return '';
  }

  const getTimeArrow = () => {
    if (sortType === 'time' && orderType === 'ASC') {
      return '↑';
    } else if (sortType === 'time' && orderType === 'DESC') {
      return '↓';
    }
    return '';
  }

  return (
    <div className={`winners-wrapper ${isVisible ? '' : 'hidden'}`}>
      <h2>Winners ({totalWinnersCount})</h2>
      <div className="pagination-buttons-wrapper">
        <button className="btn" type="button" onClick={() => toPrevPage()} disabled={isPrevDisabled}>
          Prev
        </button>
        <button className="btn" type="button" onClick={() => toNextPage()} disabled={!isNextEnabled}>
          Next
        </button>
      </div>
      <h3>Page #{currentWinnersPage}</h3>
      <table className='winners-table'>
        <thead className='winners-table-head'>
          <tr>
            <td>Number</td>
            <td>Car</td>
            <td className='name-col'>Name</td>
            <td className='wins-col'><span className='table-link' onClick={() => handleLinkClick('wins')}>Wins {getWinsArrow()}</span></td>
            <td className='time-col'><span className='table-link' onClick={() => handleLinkClick('time')}>Best time (seconds) {getTimeArrow()}</span></td>
          </tr>
        </thead>
        <tbody>
          {winnerItems}
        </tbody>
      </table>
    </div>
  );
};

export default WinnersPage;
