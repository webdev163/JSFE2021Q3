import React, { FC } from 'react';

import './Winners.scss';

type Props = {
  isVisible: boolean;
};

const Winners: FC<Props> = ({ isVisible }) => {
  return (
    <div className={`winners-wrapper ${isVisible ? '' : 'hidden'}`}>
      <h1>Winners Page</h1>
    </div>
  );
};

export default Winners;
