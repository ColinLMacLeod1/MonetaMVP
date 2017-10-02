import React from 'react';
import axios from 'axios';
import FeedbackComponent from './FeedbackComponent.js'


export default class Feedback extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			feedback:[],
			userCount:0
		}
		this.getFeedback = this.getFeedback.bind(this)
	}
	componentDidMount(){
		const self = this;
		axios.get('https://monettatech.com/usercount')
			.then(function(res) {
				self.setState({
          userCount:res.data
        })
			})
			.catch(function(error) {
				console.log(error)
			})
	}

  getFeedback() {
		const self = this;
		axios.get('https://monettatech.com/feedback')
			.then(function(res) {
				self.setState({
          feedback:res.data
        })
				console.log('Got Feedback')
			})
			.catch(function(error) {
				console.log(error)
			})
	}

  render() {
  		return (
  				<div>
						<FeedbackComponent
							getFeedback={this.getFeedback}
							userCount={this.state.userCount}
							feedback={this.state.feedback}
						/>
  				</div>
  			)
  	}
  }
