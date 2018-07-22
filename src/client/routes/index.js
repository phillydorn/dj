import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from '../App/App';
import Home from '../Home/HomeContainer';


const AppRouter = () => (
  <Router>
    <App>
      <Route exact path="/" component = {Home} />
    </App>
  </Router>
);

export default AppRouter;