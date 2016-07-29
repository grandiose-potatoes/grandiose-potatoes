'use strict';
import React from 'react';
var Router = require('react-router')

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
    this.handelUsernameChange = this.handelUsernameChange.bind(this)
    this.handelPasswordChange = this.handelPasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handelUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handelPasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
    $.ajax({
      type: 'POST',
      url: 'api/login',
      data: {username: this.state.username, password: this.state.username}
    }).done(function(path){
      Router.browserHistory.push(path)
    })
  }

  render() {
    return (
      <div className="col s8 offset-s2">
      <h2 className="header center blue-text blue-darken-1">Login</h2>
      <br />
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="last_name" type="text" className="validate" value={this.state.username} onChange={this.handelUsernameChange} />
                <label htmlFor="last_name">Username</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="password" type="password" className="validate" value={this.state.password} onChange={this.handelPasswordChange} />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <button className="waves-effect waves-light btn blue darken-1">Login</button>
            <p>Not a user? <a href='signup'>SignUp</a></p>
          </form>
        </div>
      </div>
    );
  }
}