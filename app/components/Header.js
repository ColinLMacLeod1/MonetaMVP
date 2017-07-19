import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
		<div className="header" style={{width:'100vw',display:'inline-block'}}>
			<center>
				<h4><Link to="/">Home</Link></h4>
				<h4><Link to="/about">About</Link></h4>
				<h4><Link to="/colin">Colin</Link></h4>
				<h4><Link to="/meeting">Meeting</Link></h4>
				<h4><Link to="/fileEdit">FileEdit</Link></h4>
				<h4><Link to="/search">Search</Link></h4>
			</center>
		</div>
	)

export default Header;
