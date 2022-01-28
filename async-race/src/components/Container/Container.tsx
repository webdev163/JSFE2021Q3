import React, { FC } from 'react';
import NavMenu from '../NavMenu';
import GaragePage from '../../pages/Garage';
import WinnersPage from '../../pages/Winners';
import { ContainerProps } from './types';
import { AppCtx } from '../../utils/context';
import { GlobalState, Pages } from '../../utils/types';
import { WINNERS_PER_PAGE_COUNT } from '../../utils/constants';

import './Container.scss';

const Container: FC<ContainerProps> = ({ handleToggleView, isWinnersVisible, updateState }) => {
  const appContext = React.useContext(AppCtx) as GlobalState;
  const currentGaragePage = appContext?.currentPage as number;
  const totalPagesCount = appContext?.totalPagesCount as number;
  const currentWinnersPage = appContext?.currentWinnersPage as number;
  const totalWinnersCount = appContext?.totalWinnersCount as number;
  const totalWinnersPagesCount = Math.ceil(totalWinnersCount / WINNERS_PER_PAGE_COUNT) as number;

  const toPrevPage = (page: string): void => {
    if (page === Pages.garage && currentGaragePage > 1) {
      const newPage: number = currentGaragePage - 1;
      updateState({ currentPage: newPage });
    } else if (page === Pages.winners && currentWinnersPage > 1) {
      const newPage: number = currentWinnersPage - 1;
      updateState({ currentWinnersPage: newPage });
    }
  };

  const toNextPage = (page: string): void => {
    if (page === Pages.garage && totalPagesCount && currentGaragePage < totalPagesCount) {
      const newPage: number = currentGaragePage + 1;
      updateState({ currentPage: newPage });
    } else if (page === Pages.winners && currentWinnersPage < totalWinnersPagesCount) {
      const newPage: number = currentWinnersPage + 1;
      updateState({ currentWinnersPage: newPage });
    }
  };

  return (
    <div className="container">
      <NavMenu toggleView={() => handleToggleView()} />
      <GaragePage
        isVisible={!isWinnersVisible}
        updateState={updateState}
        toPrevPage={toPrevPage}
        toNextPage={toNextPage}
      />
      <WinnersPage
        isVisible={isWinnersVisible}
        updateState={updateState}
        toPrevPage={toPrevPage}
        toNextPage={toNextPage}
      />
    </div>
  );
};

export default Container;
