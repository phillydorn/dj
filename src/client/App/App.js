import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import {storeSocket} from '../Home/HomeActions';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: '/'
    }
  }
  
  
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('connect', () => {
      this.props.storeSocket({socket});
    });
    // socket.on("FromAPI", data => this.setState({ response: data }));
  }

  render () {
    return (
        <div>
          <CssBaseline />
          {this.props.children}
        </div>
      )
  }
}

export default withRouter(connect(null, {storeSocket})(App));