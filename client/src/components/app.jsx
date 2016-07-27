import React from 'react';
import {Home} from './Home.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	//Render nested routes if the user has navigated to a nested route endpoint, otherwise render the home component
	render() {
		if (this.props.children) {
			return (
				<div className="row">
					{this.props.children}
	  		</div>
			);
		} else {
			return (
				<div>
				  <Home />
				</div>
			);
		}	
	}
}
