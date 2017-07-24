import React from 'react';
import axios from 'axios';

var DATES = new Date();

export default class CreateDB extends React.Component {

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
			date: new Date,
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
    this.saveFile = this.saveFile.bind(this)
  }



saveFile() {
  console.log('Saving')
  const self = this;
	console.log(DATES)
  axios.post('http://localhost:4200/save',
    {
      title: self.state.title,
      type: self.state.type,
      date: DATES,
      location:self.state.location,
      groups: self.state.groups,
      chair: self.state.chair,
      members:self.state.members,
      minutes: self.state.minutes,
      actions: self.state.actions,
      decisions: self.state.decisions,
      username: 'colinlmacleod1'
    }
    )
    .then(function(res) {
      console.log(res.data)
      console.log('Saved')
			console.log(new Date(res.data.date))
    })
    .catch(function(error) {
      console.log(error)
    })
}
render() {
  return <button onClick={() => this.saveFile()}> Save </button>
}
}
