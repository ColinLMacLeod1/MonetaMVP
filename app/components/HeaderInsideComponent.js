import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import logo from '../assets/images/logo2.png';
import logo2 from '../assets/images/MonettaLogo.png'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';



export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

			open: false
		}
	}


	render() {
		console.log(this.props.openFeedback);
	return (
			<div className="header" style={{width:'100%'}}>
				<img src={logo2}/>
				<FlatButton label="Feedback" primary={true} onClick={ ()=>{this.setState({open: !this.state.open});} } />
				<Drawer
					open={this.state.open}
					docked={false}
					onRequestChange={(open) => this.setState({open})}
					width={'20%'}
					containerClassName="drawer"
					>
					<Subheader>Send us your Feedback!</Subheader>
					<TextField
			      hintText="Issues"
			      multiLine={true}
			      rows={1}
			      rowsMax={10}
						name='issue'
						value={this.props.issue}
						onChange={this.props.onChange}
						style={{width:'16vw'}}
			    />
					<TextField
			      hintText="Suggestions"
			      multiLine={true}
			      rows={1}
			      rowsMax={10}
						name='suggestion'
						value={this.props.suggestion}
						onChange={this.props.onChange}
						style={{width:'16vw'}}

			    />
					<TextField
			      hintText="Likes"
			      multiLine={true}
			      rows={1}
			      rowsMax={10}
						name='likes'
						value={this.props.likes}
						onChange={this.props.onChange}
						style={{width:'16vw'}}

			    />
					<FlatButton
						label="Send"
						primary={true}
						onClick={this.props.sendFeedback}
						fullWidth={true} />
        </Drawer>
			</div>
		);
	}
}
