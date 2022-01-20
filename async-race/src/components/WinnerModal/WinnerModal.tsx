import React, { FC } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';
import { Actions, GlobalState } from '../../utils/types';

import './WinnerModal.scss';

const WinnerModal: FC = () => {
  const actionsContext = React.useContext(ActionsCtx) as Actions;
  const appContext = React.useContext(AppCtx) as GlobalState;
  const togglePopup = actionsContext?.togglePopup as () => void;
  const isModalActive = appContext?.isModalActive as boolean;
  const winnerName = appContext?.winner?.name as string;
  const winnerTime = appContext?.winner?.time as number;

  return (
    <div className={`winner-modal ${isModalActive ? 'active' : ''}`}>
      <div className="modal-inner">
        <p className="modal-text">
          Winner is {winnerName} with {winnerTime} seconds!
        </p>
        <button className="btn" type="button" onClick={() => togglePopup()}>
          OK
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
