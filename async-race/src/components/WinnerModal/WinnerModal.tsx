import React, { FC } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';

import './WinnerModal.scss';

const WinnerModal: FC = () => {
  const actionsContext = React.useContext(ActionsCtx);
  const appContext = React.useContext(AppCtx);
  const togglePopup = actionsContext?.togglePopup as () => void;
  const isModalActive = appContext?.isModalActive;
  const winnerId = appContext?.winner?.id;
  const winnerName = appContext?.winner?.name;
  
  return (
    <div className={`winner-modal ${isModalActive ? 'active' : ''}`}>
      <div className="modal-inner">
        <p className='modal-text'>Winner is {winnerName}</p>
        <button className='btn' type='button' onClick={() => togglePopup()}>OK</button>
      </div>
    </div>
  );
};

export default WinnerModal;
