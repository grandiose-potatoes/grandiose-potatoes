import React from 'react';

class Profile extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			currentUser: 'hard-coded-user'
		}
	}

	render () {
		return (
			<div className="container">
	      <div className="sidebar">
	      	<p className="sidebar-entry">USERS</p>
	      	<p className="sidebar-entry">Ryan</p>
	      	<p className="sidebar-entry">Robb</p>
	      	<p className="sidebar-entry">John Cena</p>
	      </div>
	      
	      <div className="main">
	        <ul className="message-list">
	        	<li className="current-user">@greg: video, url: goodmorning</li>
	        	<li className="current-user">@greg: video, url: goodnight</li>
	        	<li className="other-user">@ryan: video, url: goodmorning</li>
	        </ul>
	      </div>
	    </div>
		);
	}
};

export default Profile;