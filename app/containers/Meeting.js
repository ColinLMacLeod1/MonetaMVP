import React from 'react';
import _, { clone,merge } from 'lodash';
import axios from 'axios';
import MeetingForm from '../components/MeetingForm.js'
import Dictation from '../components/Dictation.js'
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
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.toDictation = this.toDictation.bind(this)
    this.toMeta = this.toMeta.bind(this)
	}
  onChange(event,newValue){
    console.log(newValue)
    if(typeof(newValue)==='object'){
      this.setState({
        date: newValue
      })
    }
    else{
      if(event.target.name==="members"){

      }
      else{
        this.setState({
          [event.target.name]: newValue
        })
      }
    }
  }
  onSubmit(event){
    console.log(event)
    this.setState({
      pane: 1
    })
  }
  onDelete(index){
    console.log(index)
    this.setState({
    	members: this.state.members.filter(function (event, i) { return i !== index; })
    });
    console.log(this.state.members)
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
  render() {
      var data={
        title: this.state.title,
        type: this.state.type,
        date: this.state.date,
        location: this.state.location,
        members: this.state.members
      }
      switch (this.state.pane) {
      case 0:
        return (
  					<MeetingForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              onDelete={this.onDelete}
              toDictation={this.toDictation}
              errors={this.errors}
              members={this.state.members}
  					/>);
      case 1:
        return (
            <Dictation
              data={data}
              toMeta={this.toMeta}
            />);
  	}
  }
}
