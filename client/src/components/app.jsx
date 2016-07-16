'use strict'
import React from 'react';
import {VideoPlayer} from './VideoPlayer.jsx';
import $ from 'jquery';
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			video: null,
			question: null
		}
	}

	componentDidMount() {
		//ajax request get back video object
		this.setState({
			video: {
				url: 'https://www.youtube.com/embed/pckNsrbZU0U'
			}
		});

		var getQuestion = function(txt) {
			this.setState({
				question: txt
			})
		}.bind(this);

		$.ajax({
			method: 'GET',
			url: '/api/questions',
			success: function(data) {
				getQuestion(data[0].txt);
			}
		})

	}

	render() {
		return (
			<div>
				<p>{this.state.question}</p>
				<h2>yo</h2>
				<VideoPlayer video={this.state.video}/>
  		</div>
		)
	}
}