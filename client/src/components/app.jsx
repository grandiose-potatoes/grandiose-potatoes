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
				<h2 className="header center teal-text text-lighten-0">A seamless video chat experience</h2>
				<div className="row center">
					<h5 className="header col s12 light">Never miss another message again</h5>
						<br></br>
          <div className="row center">
            <Link to="/record" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">
							<span>record now</span>
						</Link>
          </div>
				</div> <br>
    		</br>
				<div className="section">
				 <div className="row">
					 <div className="col s12 m4">
						 <div className="icon-block">
							 <h2 className="center light-blue-text"><i className="material-icons">av_timer</i></h2>
							 <h5 className="center">Time Constraints</h5>
							 <p className="light">With Vime, you can video chat on your schedule. Record any video to send to someone,
								and let them watch it whenever they want.</p>
						 </div>
					 </div>
					 <div className="col s12 m4">
						 <div className="icon-block">
							 <h2 className="center light-blue-text"><i className="material-icons">textsms</i></h2>
							 <h5 className="center">Lost for words?</h5>
							 <p className="light">Vime can throw some questions your way to get the juices flowing.</p>
						 </div>
					 </div>
					 <div className="col s12 m4">
						 <div className="icon-block">
							 <h2 className="center light-blue-text"><i className="material-icons">thumb_up</i></h2>
							 <h5 className="center">User Friendly!</h5>
							 <p className="light">With Vime's minimalistic interface, recording and sharing a video can be done in just a few clicks! </p>
						 </div>
					 </div>
				 </div>
			 </div>
			</div>
		);
	}

}
