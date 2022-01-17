import React, { FC, useState } from 'react';
import NavMenu from './components/NavMenu';
import GaragePage from './pages/Garage';
import WinnersPage from './pages/Winners';
import { AppCtx } from './utils/context';
import { GlobalState } from './utils/types';

const App: FC = () => {
  const initialState: GlobalState = {
    carsArr: [],
    totalCarsCount: null,
    totalPagesCount: null,
    currentPage: 1,
    selectedCar: { name: '', color: '#000000', id: 0 },
    isModalActive: false,
    winner: null,
    isRaceActive: false,
  };
  const [isWinnersVisible, toggleView] = useState(false);
  const [globalState, updateGlobalState] = useState(initialState);

  const updateState = (state: GlobalState) => {
    updateGlobalState(state);
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
