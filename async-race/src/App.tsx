import React, { FC, useState } from 'react';
import Container from './components/Container';
import { AppCtx } from './utils/context';
import { GlobalState, CarData, WinnerData } from './utils/types';
import { INITIAL_COLOR } from './utils/constants';

const App: FC = () => {
  const [isWinnersVisible, setToggleView] = useState(false);
  const handleToggleView = () => setToggleView(!isWinnersVisible);
  const [carsArr, setCarsArr] = useState<CarData[] | never[]>([]);
  const [totalCarsCount, setTotalCarsCount] = useState<number | null>(null);
  const [totalPagesCount, setTotalPagesCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCar, setSelectedCar] = useState<CarData>({ name: '', color: INITIAL_COLOR, id: 0 });
  const [isModalActive, setModal] = useState<boolean>(false);
  const [winner, setWinner] = useState<{ id: number; name: string; time: number } | null>(null);
  const [isRaceActive, setRaceStatus] = useState<boolean>(false);
  const [winnersArr, setWinnersArr] = useState<WinnerData[] | never[]>([]);
  const [totalWinnersCount, setTotalWinnersCount] = useState<number | null>(null);
  const [currentWinnersPage, setCurrentWinnersPage] = useState<number>(1);

  const updateState = (state: GlobalState): void => {
    if (state.carsArr) {
      setCarsArr(state.carsArr);
    }
    if (state.totalCarsCount) {
      setTotalCarsCount(state.totalCarsCount);
    }
    if (state.totalPagesCount) {
      setTotalPagesCount(state.totalPagesCount);
    }
    if (state.currentPage) {
      setCurrentPage(state.currentPage);
    }
    if (state.selectedCar) {
      setSelectedCar(state.selectedCar);
    }
    if (state.isModalActive !== isModalActive) {
      setModal(state.isModalActive as boolean);
    }
    if (state.winner) {
      setWinner(state.winner);
    }
    if (state.isRaceActive !== isRaceActive) {
      setRaceStatus(state.isRaceActive as boolean);
    }
    if (state.winnersArr) {
      setWinnersArr(state.winnersArr);
    }
    if (state.totalWinnersCount) {
      setTotalWinnersCount(state.totalWinnersCount);
    }
    if (state.currentWinnersPage) {
      setCurrentWinnersPage(state.currentWinnersPage);
    }
  };

  const globalState = {
    carsArr,
    totalCarsCount,
    totalPagesCount,
    currentPage,
    selectedCar,
    isModalActive,
    winner,
    isRaceActive,
    winnersArr,
    totalWinnersCount,
    currentWinnersPage,
  };

  return (
    <AppCtx.Provider value={globalState}>
      <Container
        updateState={updateState}
        handleToggleView={() => handleToggleView()}
        isWinnersVisible={isWinnersVisible}
      />
    </AppCtx.Provider>
  );
};

export default App;
