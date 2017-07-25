import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/images/logo.png';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      open:false
		}
	}
	render() {
	return (
			<div className="header" style={{width:'100vw'}}>
				<img src={logo}/>
				<h1>MONETTA</h1>
				<FlatButton label="Feedback" primary={true} onClick={()=>{this.setState({open: !this.state.open});}} />
				<Drawer open={this.state.open}>
        </Drawer>
			</div>
		);
	}
}
