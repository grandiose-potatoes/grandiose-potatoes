'use strict'
import React from 'react';
import {Link} from 'react-router'
import $ from 'jquery';
import {VideoPlayer} from './VideoPlayer.jsx';
import {Record} from './Record.jsx';


export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			video: null,
			question: null,
			recordState: false
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