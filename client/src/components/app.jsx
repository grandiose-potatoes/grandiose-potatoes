'use strict'
import React from 'react';
import {VideoPlayer} from './VideoPlayer.jsx';
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h2>yo</h2>
				<VideoPlayer video={
					{url: "supbreeeeh"}
				}/>
  		</div>
		)
	}
}