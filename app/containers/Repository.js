import React from 'react';
import _, { clone,merge } from 'lodash';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import MeetingForm from '../components/MeetingForm.js'
import FileDisplay from '../components/FileDisplay.js'

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
		}
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
    return(
      <div className="repository">
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
          />
        </div>
      </div>
    )
  }
}
