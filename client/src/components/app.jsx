'use strict';
import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';


export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.children) {
			return (
				<div className="row">
					{this.props.children}
	  		</div>
			);
		}
		return (
			<div className="row">
				<br></br>
				<h2 className="header center teal-text text-lighten-0">A seamless video chat experience</h2>
				<div className="row center">
					<h4 className="header col s12 light">Never miss another message again</h4>
					<div className="col s12 m12 offset-m2 l6 offset-l3">
		        <div className="row valign-wrapper">
		          <div className="col s0">
		            <Link to="/record" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">
									<span>record</span>
								</Link>
		          </div>
		            <div className="col s10">
		              <span>
		                Have you ever missed out on a video chat with a loved one because of time constraints? With Vime, you can video chat on your schedule, whenever you want. Record any video to send to someone, and let them watch it whenever they want. Lost for words? Vime can throw some questions your way to get the juices flowing.
		              </span>
		            </div>
		          </div>
		      </div>
				</div>
			</div>
		);
	}

}
