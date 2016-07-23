'use strict'
import React from 'react';
import {Link} from 'react-router'
import $ from 'jquery';


export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.children) {
			return (
				<div>
					{this.props.children}
	  		</div>
			)
		}
		return (
				<div id="index-banner" className="parallax-container">
					<div className="section no-pad-bot">
						<div className="container">
							<br></br>
							<h2 className="header center teal-text text-lighten-0"> This is video messaging app!</h2>
							<div className="row center">
								<h5 className="header col s12 light"> we can add something cheesy here </h5>
							</div>
							<div className="row center">
								<Link to="/record" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">
									<span>record Now</span>
								</Link>
							</div>
							<br></br>
						</div>
					</div>
				</div>
		)
	}
}
