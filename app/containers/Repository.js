import React from 'react';
import _, { clone,merge } from 'lodash';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import MeetingForm from '../components/MeetingForm.js'
import FileDisplay from '../components/FileDisplay.js'
import Snackbar from 'material-ui/Snackbar'

export default class Repository extends React.Component {
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
      email:false
		}
    this.createEmail = this.createEmail.bind(this)
    this.toEmail = this.toEmail.bind(this)
    this.toPDF = this.toPDF.bind(this)
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
    this.setState({
      email:true
    })
    var test = this.createEmail();
    location.href = test;
    console.log(test)
  }
  toPDF(){
    console.log('to PDF')
  }
  render(){
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
    var page = null;
    if(this.props.meetingRes && this.props.results !== []){
        page = (<div className="repository">
          <List className="meetingList">
          {this.props.results.map((result,index) =>
            <ListItem
              primaryText={result.title}
              secondaryText={(new Date(result.date)).toDateString()}
              onClick={()=>this.props.selectResult(index)}
              key={index}/>
          )}
          </List>
          <div className="displayContainer">
            <FileDisplay
              data={this.props.meetingRes}
              toEmail={this.toEmail}
              toPDF={this.toPDF}
              deleteMeeting={this.props.deleteMeeting}
            />
          </div>
          <Snackbar
                open={this.state.email}
                message="Preparing Your Email!"
                autoHideDuration={4000}

              />
        </div>);
      } else {
        page = null;
      }
    return(
      <div>
        {page}
      </div>
    )
  }
}
