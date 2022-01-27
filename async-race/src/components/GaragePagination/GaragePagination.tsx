import React, { FC } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';
import { Actions, GlobalState } from '../../utils/types';
import { CURRENT_PAGE_PAGINATION_MIN_VALUE } from '../../utils/constants';

import './GaragePagination.scss';

const GaragePagination: FC = () => {
  const actionsContext = React.useContext(ActionsCtx) as Actions;
  const appContext = React.useContext(AppCtx) as GlobalState;
  const toPrevPage = actionsContext?.toPrevPage as () => void;
  const toNextPage = actionsContext?.toNextPage as () => void;
  const isPrevDisabled: boolean = (appContext?.currentPage as number) === CURRENT_PAGE_PAGINATION_MIN_VALUE;
  const isNextEnabled: boolean = (appContext?.currentPage as number) < (appContext?.totalPagesCount as number);
  const isRaceActive = appContext?.isRaceActive as boolean;
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
