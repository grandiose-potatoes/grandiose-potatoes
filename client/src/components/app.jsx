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
				
				<h2 className="header center blue-text blue-darken-1">A seamless video chat experience</h2>
				<div className="row center">
					<h4 className="header col s12 light">Never miss another message again</h4>
		      <Link to="/record" id="download-button" className="btn-large waves-effect waves-light blue darken-1">
						<span>record a video</span>
					</Link>
				</div>

				<div className="section">
				  <div className="row">
					  <div className="col s12 m4">
						  <div className="icon-block">
							  <h2 className="center light-blue-text"><i className="medium material-icons">av_timer</i></h2>
							  <h5 className="center">On your time</h5>
							  <p className="light">With Vime, you can create a video message on your own schedule. Record a video to send to someone
								  and let them watch it whenever they want. Can't talk face to face in the morning because someone is going to sleep in a different time zone? No problem, record a video and they can watch the video whenever they wake up. Never let time be a factor again.</p>
						  </div>
					  </div>
					  <div className="col s12 m4">
						  <div className="icon-block">
							  <h2 className="center light-blue-text"><i className="medium material-icons">group</i></h2>
							  <h5 className="center">Simplicity</h5>
							  <p className="light">With Vime's minimalistic interface, recording and sharing a video can be done in just a couple clicks. There's no reason to miss out on great conversations with loved ones because something is too difficult to use. We're all about being connected.</p>
						  </div>
					  </div>
					  <div className="col s12 m4">
						  <div className="icon-block">
							  <h2 className="center light-blue-text"><i className="medium material-icons">textsms</i></h2>
							  <h5 className="center">Lost for words?</h5>
							  <p className="light">Sometimes we don't have much to say outside of what we ate for lunch, but there's some great stories that happen throughout the day we forget that people would love to hear. Vime can throw some questions your way to get the juices flowing so every video is unique and interesting.</p>
						  </div>
					  </div>
				  </div>
			  </div>
			</div>
		);
	
	}
}
