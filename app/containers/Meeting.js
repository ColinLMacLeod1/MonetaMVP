import React from 'react';
import axios from 'axios';
import MeetingForm from '../components/MeetingForm.js'
import Dictation from '../components/Dictation.js'
import FileDisplay from '../components/FileDisplay.js'
export default class Meeting extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			start: false,
			stop: false,
			title: "Finalize Sgt.Peppers Lyrics",
			type: "Songwriting Meeting",
			date: new Date(),
			location:"Abbey Road",
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
			decisions: ["Decision Test"],
      pane: 0,
      username: this.props.username
		}
    this.onChange = this.onChange.bind(this)
    this.toDictation = this.toDictation.bind(this)
    this.toMeta = this.toMeta.bind(this)
    this.toFile = this.toFile.bind(this)
    this.save = this.save.bind(this)
    this.toEmail = this.toEmail.bind(this)
    this.toPDF = this.toPDF.bind(this)
    this.createEmail = this.createEmail.bind(this)
	}
  onChange(event, newValue, chips){
    console.log(newValue)
    if(newValue === null){
      console.log('Called!')
      this.setState({
        members: chips
      })
    }
    else if(typeof(newValue)==='object'){
      this.setState({
        date: newValue
      })
    }
    else{
        this.setState({
          [event.target.name]: newValue
        })
    }
  }
  toDictation(){
    this.setState({
      pane: 1
    })
  }
  toMeta(){
    this.setState({
      pane: 0
    })
  }
  toFile(){
    this.setState({
      pane: 2
    })
  }
  save(){
    console.log('Saving')
    const self = this;
		axios.post('http://localhost:4200/save',
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
				decisions: self.state.decisions,
        username: self.state.username
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
  createEmail() {
	// Making all of the values variables
	var mailURI = "mailto:";
	var title = "%0A" +  this.state.title;
	var type = "%0A" +this.state.type;
	var date = "%0A" +this.state.date;
	var location = "%0A" +this.state.location + "%0A";
	var groups = "%0AGroups:%0A"
	var chair= "%0AChair: " +this.state.chair;
	var members= "%0AMembers:%0A";
	var minutes= "%0AMinutes:%0A";
	var actions= "%0AActions:%0A";
	var decisions= "%0ADecisions:%0A";
	var message = "%0A%0A%0AThis message was sent to you by Monetta, meeting minutes for the 21st century";
	var body = "";
	// Making arrays into legit strings
	for(var i=0;i<this.state.groups.length;i++) {
		groups = groups + this.state.groups[i] + "%0A";
	}
	console.log(groups)
	for(var i=0;i<this.state.members.length;i++) {
		members = members + this.state.members[i] + "%0A";
	}
	console.log(members)
	for(var i=0;i<this.state.minutes.length;i++) {
		minutes = minutes + this.state.minutes[i] + "%0A";
	}
	console.log(minutes)
	for(var i=0;i<this.state.actions.length;i++) {
		actions = actions + this.state.actions[i].phrase + " Assigned to: " + this.state.actions[i].assigned.toString() + " Due " + this.state.actions[i].date + "%0A";
	}
	console.log(actions)
	for(var i=0;i<this.state.decisions.length;i++) {
		decisions = decisions + this.state.decisions[i] + "%0A";
	}
	console.log(decisions)

	body = title + type + date + location  + groups + chair + members + minutes + actions + decisions + message;
	return  mailURI  + "?body=" + body ;
	}
  toEmail(){
    var test = this.createEmail();
		location.href = test;
		console.log(test)
  }
  toPDF(){
    console.log('to PDF')
  }
  render() {
      var data={
        title: this.state.title,
        type: this.state.type,
        date: this.state.date,
        location: this.state.location,
        members: this.state.members,
        minutes: this.state.minutes,
        actions: this.state.actions,
        decisions: this.state.decisions
      }
      switch (this.state.pane) {
      case 0:
        return (
  					<MeetingForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              onDelete={this.onDelete}
              memberChange={this.memberChange}
              toDictation={this.toDictation}
              errors={this.errors}
              data={data}
  					/>);
      case 1:
        return (
            <Dictation
              data={data}
              toMeta={this.toMeta}
              toFile={this.toFile}
            />);
      case 2:
        return (
            <FileDisplay
              data={data}
              toDictation={this.toDictation}
              save={this.save}
              toPDF={this.toPDF}
              toEmail={this.toEmail}
            />);
  	}
  }
}
