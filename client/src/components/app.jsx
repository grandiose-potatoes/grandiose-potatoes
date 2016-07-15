'use strict'
import React from 'react';
import {VideoPlayer} from './VideoPlayer.jsx';
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			video: null
		}
	}

	componentDidMount() {
		//ajax request get back video object

		this.setState({
			video: {
				url: 'https://www.youtube.com/embed/pckNsrbZU0U'
			}
		})
	}

	render() {
		return (
			<div>
				<h2>yo</h2>
				<VideoPlayer video={this.state.video}/>
  		</div>
		)
	}
}