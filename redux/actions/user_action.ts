import { SET_USER } from './types';

export function setUser(user: any) {
  return {
    type: SET_USER,
    payload: user,
  };
}
