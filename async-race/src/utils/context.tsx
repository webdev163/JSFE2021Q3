import React from 'react';
import { GlobalState } from './types';

const AppCtx = React.createContext<GlobalState | null>(null);

export default AppCtx;