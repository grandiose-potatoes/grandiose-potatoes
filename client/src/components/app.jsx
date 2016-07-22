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
				<div>
					{this.props.children}
	  		</div>
			);
		}
		return (
			<div>
				<h1> This is the homepage </h1>
				<Link to="/record">
					<h2> Record Now</h2>
				</Link>
  		</div>
		);
	}

}