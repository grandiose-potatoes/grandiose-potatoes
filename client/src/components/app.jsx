'use strict'
import React from 'react';
import {Link} from 'react-router'
import $ from 'jquery';


export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1>
				This is the homepage
				</h1>
				<Link to="/record">
					<h2> Click Me </h2>
				</Link>
				<Link to="/videos/asldglaiejga">
					<h2> Click Me videos </h2>
				</Link>
				<div>
					{this.props.children}
				</div>
  		</div>
		)
	}

}