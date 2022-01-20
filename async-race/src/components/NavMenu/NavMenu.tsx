import React, { FC } from 'react';
import { AppCtx } from '../../utils/context';
import { GlobalState } from '../../utils/types';

import './NavMenu.scss';

type Props = {
  winnersView: (e: React.MouseEvent<HTMLElement>) => void;
  garageView: (e: React.MouseEvent<HTMLElement>) => void;
};

const NavMenu: FC<Props> = ({ winnersView, garageView }) => {
  const appContext = React.useContext(AppCtx) as GlobalState;
  const areButtonsDisabled = appContext?.isRaceActive as boolean;
  return (
    <div className="nav-btn-wrapper">
      <button type="button" className="btn nav-button" onClick={winnersView} disabled={areButtonsDisabled}>
        To garage
      </button>
      <button type="button" className="btn nav-button" onClick={garageView} disabled={areButtonsDisabled}>
        To winners
      </button>
    </div>
  );
};

export default NavMenu;
