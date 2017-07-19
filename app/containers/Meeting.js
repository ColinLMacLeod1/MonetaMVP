import React from 'react';
import _, { clone,merge } from 'lodash';
import axios from 'axios';
import MeetingForm from '../components/MeetingForm.js'

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
			date: {},
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
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
	}
  onChange(event,newValue){
    if(typeof(newValue)==='object'){
      this.setState({
        date: newValue
      })
    }else{
      this.setState({
        [event.target.name]: newValue
      })
    }
  }
  onSubmit(event){
    console.log(this.state)
  }
  render() {
  		return (
  					<MeetingForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              errors={this.errors}
  					/>
  			)
  	}
  }
