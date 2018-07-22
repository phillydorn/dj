import Immutable from 'immutable';
import * as ActionType from './HomeActions';

const defaultState = Immutable.fromJS({
  songs: [],
  socket: null,
  songToPlay: -1,
});


function homeReducer(state = defaultState, action) {
  const {
    songs,
    socket,
    songToPlay,
  } = action;

  switch (action.type) {

    case ActionType.FETCHED_SONGS:
      return state.merge(Immutable.fromJS({ songs }));
    case ActionType.STORED_SOCKET:
      return state.merge(Immutable.fromJS({ socket }));
    case ActionType.PLAY_SONG:
      return state.merge(Immutable.fromJS({ songToPlay }));
    default:
      return state;
  }
}

export default homeReducer;
