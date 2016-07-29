import React from 'react';
import { Router, Route } from 'react-router';
import App from './components/app.jsx';
import Record from './components/Record.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import Profile from './components/Profile.jsx';

export default (
  <Route path="/" component={App}>
    <Route path="record" component={Record} />
    <Route path="videos/:id" component={VideoPlayer} />
    <Route path="profile" component={Profile} />
    <Route path="login" component={Login} />
    <Route path="signup" component={Signup}/>
  </Route>
);
