'use strict';
import React from 'react';
// import { getPreSignedUrl, getSupportedTypes, getQuestions, putObjectToS3, postVideoUrl } from '../recordUtil.js';
// import {Questions} from './Questions.jsx';

export default class Login extends React.Component {

  render() {
    return (
      <div className="col s8 offset-s2">
      <h2 className="header center blue-text blue-darken-1">Login</h2>
      <br />
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input id="last_name" type="text" className="validate" />
                <label htmlFor="last_name">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <a className="waves-effect waves-light btn blue darken-1">Login</a>
            <p>Not a user? <a href='signup'>SignUp</a></p>
          </form>
        </div>
      </div>
    );
  }
}