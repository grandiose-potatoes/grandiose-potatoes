import React from 'react';
import {Router, Route} from 'react-router';
import App from './components/app.jsx';
import Record from './components/Record.jsx';
import Login from './components/Login.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login}/>
    <Route path="record" component={Record}/>
    <Route path="videos/:id" component={VideoPlayer}/>
  </Route>
);