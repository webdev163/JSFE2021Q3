import React, { FC } from 'react';
import { ActionsCtx } from '../../utils/context';

import './GaragePagination.scss';

const GaragePagination: FC = () => {
  const actionsContext = React.useContext(ActionsCtx);
  const toPrevPage = actionsContext?.toPrevPage as () => void;
  const toNextPage = actionsContext?.toNextPage as () => void;
  return (
    <div className="pagination-wrapper">
      <button className="btn" type="button" onClick={() => toPrevPage()}>
        Prev
      </button>
      <button className="btn" type="button" onClick={() => toNextPage()}>
        Next
      </button>
    </div>
  );
};

export default GaragePagination;
