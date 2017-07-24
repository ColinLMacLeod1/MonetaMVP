import React from 'react';
import _, { clone,merge } from 'lodash';
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
      pane: 0
		}
    this.onChange = this.onChange.bind(this)
    this.toDictation = this.toDictation.bind(this)
    this.toMeta = this.toMeta.bind(this)
    this.toFile = this.toFile.bind(this)
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

            />);
  	}
  }
}
