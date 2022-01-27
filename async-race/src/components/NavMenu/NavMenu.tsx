import React, { FC } from 'react';
import { AppCtx } from '../../utils/context';
import { GlobalState } from '../../utils/types';
import { NavMenuProps } from './types';

import './NavMenu.scss';

const NavMenu: FC<NavMenuProps> = ({ toggleView }) => {
  const appContext = React.useContext(AppCtx) as GlobalState;
  const areButtonsDisabled = appContext?.isRaceActive as boolean;
  return (
    <div className="nav-btn-wrapper">
      <button type="button" className="btn nav-button" onClick={toggleView} disabled={areButtonsDisabled}>
        To garage
      </button>
      <button type="button" className="btn nav-button" onClick={toggleView} disabled={areButtonsDisabled}>
        To winners
      </button>
    </div>
  );
};

export default NavMenu;
