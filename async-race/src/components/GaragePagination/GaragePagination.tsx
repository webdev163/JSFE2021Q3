import React, { FC } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';

import './GaragePagination.scss';

const GaragePagination: FC = () => {
  const actionsContext = React.useContext(ActionsCtx);
  const appContext = React.useContext(AppCtx);
  const toPrevPage = actionsContext?.toPrevPage as () => void;
  const toNextPage = actionsContext?.toNextPage as () => void;
  const isPrevDisabled = (appContext?.currentPage as number) < 2;
  const isNextEnabled = (appContext?.currentPage as number) < (appContext?.totalPagesCount as number);
  const isRaceActive = appContext?.isRaceActive;
  return (
    <div className="pagination-wrapper">
      <button className="btn" type="button" onClick={() => toPrevPage()} disabled={isPrevDisabled || isRaceActive}>
        Prev
      </button>
      <button className="btn" type="button" onClick={() => toNextPage()} disabled={!isNextEnabled || isRaceActive}>
        Next
      </button>
    </div>
  );
};

export default GaragePagination;
