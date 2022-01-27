import React, { FC, useState } from 'react';
import NavMenu from './components/NavMenu';
import GaragePage from './pages/Garage';
import WinnersPage from './pages/Winners';
import { AppCtx } from './utils/context';
import { GlobalState } from './utils/types';

const initialState: GlobalState = {
  carsArr: [],
  totalCarsCount: null,
  totalPagesCount: null,
  currentPage: 1,
  selectedCar: { name: '', color: '#000000', id: 0 },
  isModalActive: false,
  winner: null,
  isRaceActive: false,
  winnersArr: [],
  totalWinnersCount: null,
};

const App: FC = () => {
  const [isWinnersVisible, toggleView] = useState(false);
  const [globalState, setGlobalState] = useState(initialState);

  const updateState = (state: GlobalState): void => {
    setGlobalState(state);
  };

  return (
    <AppCtx.Provider value={globalState}>
      <div className="container">
        <NavMenu winnersView={() => toggleView(false)} garageView={() => toggleView(true)} />
        <GaragePage isVisible={!isWinnersVisible} updateState={updateState} />
        <WinnersPage isVisible={isWinnersVisible} />
      </div>
    </AppCtx.Provider>
  );
};

export default App;
