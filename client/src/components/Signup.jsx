import React from 'react';
const Router = require('react-router');

export default class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
    this.handelUsernameChange = this.handelUsernameChange.bind(this);
    this.handelPasswordChange = this.handelPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    $.ajax({
      type: 'POST',
      url: 'api/signup',
      data: {
        username: this.state.username, password: this.state.password,
      },
    })
    .done((path) => {
      Router.browserHistory.push(path);
    });
  }

  render() {
    return (
      <div className="col s8 offset-s2">
        <h2 className="header center blue-text blue-darken-1">Signup</h2>
        <br />
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit} >
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
            <button className="waves-effect waves-light btn blue darken-1">Signup</button>
          </form>
          <p>Already a user? <a href="login">Login</a></p>
        </div>
      </div>
    );
  }
}
