import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import logo from '../assets/images/logo.png';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:"colinlmacleod1",
			issue:'',
			suggestion:'',
			likes:'',
      open:false
		}
		this.closeDrawer = this.closeDrawer.bind(this)
		this.sendFeedback = this.sendFeedback.bind(this)
		this.issueChange = this.issueChange.bind(this)
		this.suggestionChange = this.suggestionChange.bind(this)
		this.likesChange = this.likesChange.bind(this)
	}
	closeDrawer(){this.setState({open: false});}

	sendFeedback(){
		console.log('Issue: ' +this.state.issue,'Suggestion: '+this.state.suggestion)
		const self = this;
		axios.post('http://localhost:4200/feedback',
			{
				username: self.state.username,
				date: (new Date()).getTime(),
        issue: self.state.issue,
				suggestion: self.state.suggestion,
				likes: self.state.likes
			}
			)
			.then(function(res) {
				console.log(res.data)
        self.setState({
          issue:'',
					suggestion:''
        })
				console.log('Feedback Sent')
			})
			.catch(function(error) {
				console.log(error)
			})
		this.closeDrawer()
	}
	issueChange(event){
    this.setState({
      issue: event.target.value,
    });
  };
	suggestionChange(event){
    this.setState({
      suggestion: event.target.value,
    });
  };
	likesChange(event){
    this.setState({
      likes: event.target.value,
    });
  };


	render() {
	return (
			<div className="header" style={{width:'100vw'}}>
				<img src={logo}/>
				<h1>MONETTA</h1>
				<FlatButton label="Feedback" primary={true} onClick={()=>{this.setState({open: !this.state.open});}} />
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
						value={this.state.issue}
						onChange={this.issueChange}
						style={{width:'16vw'}}
			    />
					<TextField
			      hintText="Suggestions"
			      multiLine={true}
			      rows={1}
			      rowsMax={10}
						value={this.state.suggestion}
						onChange={this.suggestionChange}
						style={{width:'16vw'}}

			    />
					<TextField
			      hintText="Likes"
			      multiLine={true}
			      rows={1}
			      rowsMax={10}
						value={this.state.likes}
						onChange={this.likesChange}
						style={{width:'16vw'}}

			    />
					<FlatButton
						label="Send"
						primary={true}
						onClick={this.sendFeedback}
						fullWidth={true} />
        </Drawer>
			</div>
		);
	}
}
