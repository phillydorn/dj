import React from 'react';
import { connect } from 'react-redux';
import Song from './Song';

const Songs = props => {
  return (
    <div className="songs">
      {props.songs.map((song, idx) => (
      <Song song={song} idx={idx} key={`${song.link}-${idx}`} />))}
    </div>
  )
}

function mapStateToProps(state) {
  const { songs } = state.home.toJS();
  return {songs}
}
export default connect(mapStateToProps, {})(Songs);

