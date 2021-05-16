import { setUser } from '../actions/user_action';
import { SET_USER, CLEAR_USER } from './../actions/types';

type UserAction = ReturnType<typeof setUser>;
type userState = {
  currentUser: any;
  isLoading: boolean;
};

const initialUserState: userState = {
  currentUser: null,
  isLoading: true,
};

export default function user(state = initialUserState, action: UserAction) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
}
