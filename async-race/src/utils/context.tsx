import React from 'react';
import { GlobalState, Actions } from './types';

const AppCtx = React.createContext<GlobalState | null>(null);
const ActionsCtx = React.createContext<Actions | null>(null);

export { AppCtx, ActionsCtx };