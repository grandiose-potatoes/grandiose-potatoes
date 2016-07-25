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
					<div className="col s12 m12 offset-m2 l6 offset-l3">
		        <div className="row valign-wrapper">
		          <div className="col s0">
		            <Link to="/record" id="download-button" className="btn-large waves-effect waves-light blue darken-1">
									<span>record</span>
								</Link>
		          </div>
		            <div className="col s10">
		              <span>
		                Have you ever missed out on a video chat with a loved one because of the time just didn't work out? With Vime, you can video chat on your schedule, whenever you want with whoever you want.
		              </span>
		            </div>
		          </div>
		      </div>
				</div>

				<br>
    		</br>
				<div className="section">
				 <div className="row">
					 <div className="col s12 m4">
						 <div className="icon-block">
							 <h2 className="center light-blue-text"><i className="medium material-icons">av_timer</i></h2>
							 <h5 className="center">Time</h5>
							 <p className="light">With Vime, you can video chat on your schedule. Record any video to send to someone,
								and let them watch it whenever they want. Can't talk in the morning because of a time zone difference?</p>
						 </div>
					 </div>
					 <div className="col s12 m4">
						 <div className="icon-block">
							 <h2 className="center light-blue-text"><i className="medium material-icons">group</i></h2>
							 <h5 className="center">User Friendly!</h5>
							 <p className="light">With Vime's minimalistic interface, recording and sharing a video can be done in just a few clicks! Record any video to send to someone, and let them watch it whenever they want. Lost for words?
						 Vime can throw some questions your way to get the juices flowing.</p>
						 </div>
					 </div>
					 <div className="col s12 m4">
						 <div className="icon-block">
							 <h2 className="center light-blue-text"><i className="medium material-icons">textsms</i></h2>
							 <h5 className="center">Lost for words?</h5>
							 <p className="light">Vime can throw some questions your way to get the juices flowing.</p>
						 </div>
					 </div>
				 </div>
			 </div>
			</div>
		);
	}

}
