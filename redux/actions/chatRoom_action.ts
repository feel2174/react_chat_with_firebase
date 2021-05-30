import { SET_CURRENT_CHAT_ROOM } from './types';

export function setCurrentChatRoom(currentChatRoom: any) {
  return {
    type: SET_CURRENT_CHAT_ROOM,
    payload: currentChatRoom,
  };
}
