//TYPES Definition

import 'react-redux';

import { AppState } from '../reducers';

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends AppState {}
}

export const SET_USER = 'set_user';
export const CLEAR_USER = 'clear_user';
