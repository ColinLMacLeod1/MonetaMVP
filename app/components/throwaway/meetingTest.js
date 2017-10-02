import React from 'react';
import _, { clone,merge } from 'lodash';
import axios from 'axios';
import FileEdit from './FileEdit.js';

export default class meetingTest extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			start: false,
			stop: false,
			text: [],
			tasks:[],
			tInput: "",
			value:'lkjhkljh',
			title: "Finalize Sgt.Peppers Lyrics",
			type: "Songwriting Meeting",
			date: "Wednesday, June 28th",
			location:"Place",
			groups: ["tech", "Sales"],
			chair: "Litt",
			members: [
				"Paul",
			    "John",
			    "George",
			    "Ringo"
				],
			minutes: [
				"Minute test",
				"Also a test"
			],
			actions: [{phrase: "Action Test", assigned:["Litt"], date:"ASAP"}],
			decisions: ["Decision Test"]
		}
		this.textChange = this.textChange.bind(this)
		this.handleMemberChange = this.handleMemberChange.bind(this)
		this.handleMinuteChange = this.handleMinuteChange.bind(this)
		this.handleActionChange = this.handleActionChange.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.saveFile - this.saveFile.bind(this)

	}

  handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleMemberChange(rank,event) {
		var newArray = this.state.members
		newArray[rank] = event.target.value
		this.setState({
			members: newArray
		})
	}
	handleMinuteChange(rank,event) {
		var newArray = this.state.minutes
		newArray[rank] = event.target.value
		this.setState({
			minutes: newArray
		})
	}
	handleActionChange(rank,event) {
		var newArray = this.state.members
		newArray[rank] = event.target.value
		this.setState({
			members: newArray
		})
	}
  textChange(e) {
		this.setState({value: e.target.value});
	}
  saveFile() {
		const self = this;
		axios.post('https://monettatech.com/save',
			{
				title: self.state.title,
				type: self.state.type,
				date: self.state.date,
				location:self.state.location,
				groups: self.state.groups,
				chair: self.state.chair,
				members:self.state.members,
				minutes: self.state.minutes,
				actions: self.state.actions,
				decisions: self.state.decisions
			}
			)
			.then(function(res) {
				console.log(res.data)
				console.log('Saved')
			})
			.catch(function(error) {
				console.log(error)
			})
	}
  render() {
  		return (
  				<div>
  					<FileEdit
  							title={this.state.title}
  							chair={this.state.chair}
  							type={this.state.type}
  							date={this.state.date}
  							members={this.state.members}
  							minutes={this.state.minutes}
  							actions={this.state.actions}
  							decisions={this.state.decisions}
  							handleInputChange={this.handleInputChange}
  							handleMemberChange={this.handleMemberChange}
  							handleMinuteChange={this.handleMinuteChange}
  							handleActionChange={this.handleActionChange}
  							handleEnterChange={this.handleEnterChange}
  						/>
  					<button onClick={() => this.saveFile()}>Save</button>
  				</div>

  			)
  	}
  }
