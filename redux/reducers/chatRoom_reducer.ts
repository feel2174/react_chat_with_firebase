import { SET_CURRENT_CHAT_ROOM } from '../actions/types';

type chatRoomState = {
  currentChatRoom: any;
};

const initialChatRoomState: chatRoomState = {
  currentChatRoom: null,
};

export default function chatRoom(state = initialChatRoomState, action: any) {
  switch (action.type) {
    case SET_CURRENT_CHAT_ROOM:
      return {
        ...state,
        currentChatRoom: action.payload,
      };
    default:
      return state;
  }
}
