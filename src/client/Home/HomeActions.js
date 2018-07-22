import fetch from '../utils/fetch';

export const FETCHED_SONGS = Symbol('FETCHED_SONGS');
export const STORED_SOCKET = Symbol('STORED_SOCKET');
export const PLAY_SONG = Symbol('PLAY_SONG');

const fetchedSongs = ({songs}) => ({
  type: FETCHED_SONGS,
  songs,
})


const storedSocket = ({socket}) => ({
  type: STORED_SOCKET,
  socket,
})

const playSong = ({songToPlay}) => ({
  type: PLAY_SONG,
  songToPlay
})


export const fetchSongs = () => async (dispatch) => {
  const response = await fetch('/api/songs/');
  const songs = response.data.rows;
  dispatch(fetchedSongs({songs}));
}

export const storeSong = ({values}) => async (dispatch) => {
  const data = {
    name: values.songName,
    link: values.link,
    youTubeId: values.link.split('watch?v=')[1]
  }
  await fetch ('/api/songs/', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

export const storeSocket = ({socket}) => async (dispatch) => {
  dispatch(storedSocket({socket}));
}

export const startPlay = () => dispatch => {
  dispatch(playSong({songToPlay: 0}))
}

export const advancePlay = () => dispatch => {
  
}