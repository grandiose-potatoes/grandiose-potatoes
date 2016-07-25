'use strict';
import React from 'react';
import {Home} from './Home.jsx';


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
			<div>
			  <Home />
			</div>
		);
	
	}
}
