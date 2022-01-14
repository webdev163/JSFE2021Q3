import React, { FC } from 'react';

import './NavMenu.scss';

type Props = {
  winnersView: (e: React.MouseEvent<HTMLElement>) => void;
  garageView: (e: React.MouseEvent<HTMLElement>) => void;
};

const NavMenu: FC<Props> = ({ winnersView, garageView }) => {
  return (
    <div className="nav-btn-wrapper">
      <button type="button" className="btn nav-button" onClick={winnersView}>
        To garage
      </button>
      <button type="button" className="btn nav-button" onClick={garageView}>
        To winners
      </button>
    </div>
  );
};

export default NavMenu;
