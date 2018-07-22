import React, {Component} from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import Button from'@material-ui/core/Button';
import Card from'@material-ui/core/Card';
import CardActions from'@material-ui/core/CardActions';
import CardMedia from'@material-ui/core/CardMedia';
import CardContent from'@material-ui/core/CardContent';
import Typography from'@material-ui/core/Typography';
import { advancePlay } from '../Home/HomeActions';




class Song extends Component {

  constructor(props) {
    super(props);
    this.storePlayer = this.storePlayer.bind(this);
    this.advancePlay = this.advancePlay.bind(this);
    this.state = {
      player: null,
      playing: false,
      title: '',
      src: '',
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.songToPlay !== nextProps.songToPlay && nextProps.songToPlay === this.props.idx) {
      this.state.player.playVideo();
      this.setState({playing: true});
    }
  }

  storePlayer(e) {
    const player = e.target;
    const {title} = player.getVideoData();
    this.setState({player, title});
  }

  advancePlay() {
    this.props.advancePlay();
  }

  render() {

    const { song } = this.props;
    const { playing, title } = this.state;
    
    const opts = {
      width: '400',
      height: '200',
    }
    return (
      <Card className={`song ${playing ? 'playing' : ''}`}>
        <CardMedia>
        <YouTube 
          videoId={song.youTubeId}                  // defaults -> null
          opts={opts}
          onReady={this.storePlayer}
          onEnd={this.advancePlay}
        />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">{title}</Typography>
        </CardContent>
        <CardActions>
        <Button color="primary" >Vote</Button>
        </CardActions>
      </Card>
    )
  }
}

function mapStateToProps(state) {
  const { songToPlay } = state.home.toJS();
  return {songToPlay};
}

export default connect(mapStateToProps, {
  advancePlay
})(Song);

   