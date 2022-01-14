import React, { FC, useState } from 'react';
import NavMenu from './components/NavMenu';
import GaragePage from './pages/Garage';
import WinnersPage from './pages/Winners';

const App: FC = () => {
  const [isWinnersVisible, toggleView] = useState(false);

  return (
    <div className="container">
      <NavMenu winnersView={() => toggleView(false)} garageView={() => toggleView(true)} />
      <GaragePage isVisible={!isWinnersVisible} />
      <WinnersPage isVisible={isWinnersVisible} />
    </div>
  );
};

export default App;
