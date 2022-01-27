import React, { FC, useState, useEffect } from 'react';
import AsyncRaceService from '../../services/AsyncRaceService';
import { WinnerData, GlobalState, GetWinnersResponse, SortTypes, OrderTypes } from '../../utils/types';
import WinnersTableItem from '../../components/WinnersTableItem';
import { AppCtx } from '../../utils/context';
import { WINNERS_PER_PAGE_COUNT } from '../../utils/constants';
import { WinnersProps } from './types';

import './Winners.scss';

const WinnersPage: FC<WinnersProps> = ({ isVisible }) => {
  const appContext = React.useContext(AppCtx) as GlobalState;
  const winnersArr = appContext?.winnersArr as WinnerData[];
  const totalWinnersCount = appContext?.totalWinnersCount as number;
  const totalPagesCount = Math.ceil(totalWinnersCount / WINNERS_PER_PAGE_COUNT) as number;
  const [currentWinnersPage, setCurrentWinnersPage] = useState<number>(1);
  const [currentWinnersArr, setCurrentWinnersArr] = useState<WinnerData[]>(winnersArr);
  const [currentTotalPagesCount, setCurrentTotalPagesCount] = useState<number>(totalPagesCount);
  const [sortType, setSortType] = useState<string>(SortTypes.id);
  const [orderType, setOrderType] = useState<string>(OrderTypes.asc);
  const isPrevDisabled: boolean = currentWinnersPage < 2;
  const isNextEnabled: boolean = currentWinnersPage < currentTotalPagesCount;

  const getWinners = async (page: number, limit: number, sort: string = SortTypes.id, order = ''): Promise<void> => {
    const response: GetWinnersResponse = await AsyncRaceService.getWinners(page, limit, sort, order);
    setCurrentWinnersArr(response.winnersArr);
  };

  const updateTotalPagesCount = (): void => {
    setCurrentTotalPagesCount(Math.ceil(totalWinnersCount / WINNERS_PER_PAGE_COUNT));
  };

  useEffect(() => {
    getWinners(currentWinnersPage, WINNERS_PER_PAGE_COUNT, sortType, orderType);
  }, [currentWinnersPage, winnersArr, sortType, orderType]);

  useEffect(() => {
    updateTotalPagesCount();
  }, [totalWinnersCount]);

  const winnerItems: JSX.Element[] = currentWinnersArr?.map((winner: WinnerData, ndx: number) => {
    const number: number = ndx + 1 + (currentWinnersPage - 1) * WINNERS_PER_PAGE_COUNT;
    return (
      <WinnersTableItem
        key={winner.id}
        carId={winner.id}
        number={number}
        wins={winner.wins}
        time={winner.time}
        winnersArr={currentWinnersArr}
      />
    );
  });

  const toPrevPage = (): void => {
    if (currentWinnersPage > 1) {
      const newPage: number = currentWinnersPage - 1;
      getWinners(newPage, WINNERS_PER_PAGE_COUNT, sortType, orderType);
      setCurrentWinnersPage(newPage);
    }
  };

  const toNextPage = (): void => {
    if (currentWinnersPage < currentTotalPagesCount) {
      const newPage: number = currentWinnersPage + 1;
      getWinners(newPage, WINNERS_PER_PAGE_COUNT, sortType, orderType);
      setCurrentWinnersPage(newPage);
    }
  };

  const handleLinkClick = (type: string): void => {
    setSortType(type);
    setOrderType(orderType === OrderTypes.asc ? OrderTypes.desc : OrderTypes.asc);
    getWinners(currentWinnersPage, WINNERS_PER_PAGE_COUNT, sortType, orderType);
  };

  const getArrow = (type: string): string => {
    if (sortType === type && orderType === OrderTypes.asc) {
      return '↑';
    }
    if (sortType === type && orderType === OrderTypes.desc) {
      return '↓';
    }
    return '';
  };

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
      <table className="winners-table">
        <thead className="winners-table-head">
          <tr>
            <td>Number</td>
            <td>Car</td>
            <td className="name-col">Name</td>
            <td className="wins-col">
              <button type="button" className="table-link" onClick={() => handleLinkClick(SortTypes.wins)}>
                Wins<span className="table-link-arrow"> {getArrow(SortTypes.wins)}</span>
              </button>
            </td>
            <td className="time-col">
              <button type="button" className="table-link" onClick={() => handleLinkClick(SortTypes.time)}>
                Best time (seconds)<span className="table-link-arrow"> {getArrow(SortTypes.time)}</span>
              </button>
            </td>
          </tr>
        </thead>
        <tbody>{winnerItems}</tbody>
      </table>
    </div>
  );
};

export default WinnersPage;
