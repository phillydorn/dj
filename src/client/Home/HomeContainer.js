import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeSong, fetchSongs, startPlay } from './HomeActions';
import SongForm from '../song/SongForm';
import Songs from '../song/Songs';


class HomeContainer extends Component {

  constructor(props) {
    super(props);
    this.props.fetchSongs();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startPlay = this.startPlay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { socket } = nextProps;
    const self = this;
    if (!this.props.socket && socket) {
      socket.on('songAdded', self.props.fetchSongs);
      socket.on('startPlay', self.startPlay);
    }
  }
  startPlay() {
    this.props.startPlay();
  }

  handleSubmit(values) {
    // values.preventDefault();
    // const { values } = this.props;
    this.props.storeSong({values});
  }
  
  render() {
    const { songs } = this.props;
    return (
      <div className="home">
        {songs.length < 3 &&
        <SongForm onSubmit={this.handleSubmit} />}
        <Songs />
      </div>
    );
  }

}

function mapStateToProps(state) {
  const { socket, songs } = state.home.toJS();
  return { socket, songs}
}

export default connect(mapStateToProps, {
  storeSong,
  fetchSongs,
  startPlay
})(HomeContainer);