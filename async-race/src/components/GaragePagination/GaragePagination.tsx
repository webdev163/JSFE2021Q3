import React, { FC } from 'react';
import { AppCtx, ActionsCtx } from '../../utils/context';
import { Actions, GlobalState, Pages } from '../../utils/types';
import { CURRENT_PAGE_PAGINATION_MIN_VALUE } from '../../utils/constants';

import './GaragePagination.scss';

const GaragePagination: FC = () => {
  const actionsContext = React.useContext(ActionsCtx) as Actions;
  const appContext = React.useContext(AppCtx) as GlobalState;
  const toPrevPage = actionsContext?.toPrevPage as (page: string) => void;
  const toNextPage = actionsContext?.toNextPage as (page: string) => void;
  const isPrevDisabled: boolean = (appContext?.currentPage as number) === CURRENT_PAGE_PAGINATION_MIN_VALUE;
  const isNextEnabled: boolean = (appContext?.currentPage as number) < (appContext?.totalPagesCount as number);
  const isRaceActive = appContext?.isRaceActive as boolean;
  return (
    <div className="pagination-wrapper">
      <button
        className="btn"
        type="button"
        onClick={() => toPrevPage(Pages.garage)}
        disabled={isPrevDisabled || isRaceActive}
      >
        Prev
      </button>
      <button
        className="btn"
        type="button"
        onClick={() => toNextPage(Pages.garage)}
        disabled={!isNextEnabled || isRaceActive}
      >
        Next
      </button>
    </div>
  );
};

export default GaragePagination;
