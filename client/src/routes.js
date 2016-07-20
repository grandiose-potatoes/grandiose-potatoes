import React from 'react';
import {browserHistory, Router, Route} from 'react-router';

import App from './components/App.jsx';
import {Record} from './components/Record.jsx';
import {VideoPlayer} from './components/VideoPlayer.jsx';

export default (
  <Route path="/" component={App}>
    <Route path="record" component={Record}/>
    <Route path="videos/:id" component={VideoPlayer}/>
  </Route>
)