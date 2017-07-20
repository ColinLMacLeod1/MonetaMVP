import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/logo.png'
const Header = () => (
		<div className="header" style={{width:'100vw'}}>
			<img src={logo}/>
			<h1>MONETTA</h1>
		</div>
	)

export default Header;
