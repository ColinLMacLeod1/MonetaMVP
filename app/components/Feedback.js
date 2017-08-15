import React from 'react';
import _, { clone,merge } from 'lodash';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import axios from 'axios';
import FlatButton from 'material-ui/FlatButton';


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
        console.log(res.data)
				self.setState({
          userCount:res.data
        })
				console.log('Users Counted')
			})
			.catch(function(error) {
				console.log(error)
			})
	}

  getFeedback() {
		const self = this;
		axios.get('https://monettatech.com/feedback')
			.then(function(res) {
        console.log(res.data)
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
          <FlatButton label="Get Feedback" fullWidth={true} onClick={this.getFeedback} />
					{this.state.userCount}
          {this.state.feedback.map((feedback,index)=>
            <Card key={index}>
              <CardHeader
                title={feedback.username}
                subtitle={(new Date(feedback.date)).toString()}
              />
              <CardText>
                {'Suggestions: ' +feedback.suggestion}
              </CardText>
              <CardText>
                {'Issues: ' +feedback.issue}
              </CardText>
              <CardText>
                {'Likes: ' +feedback.likes}
              </CardText>
            </Card>
          ).reverse()}
  				</div>
  			)
  	}
  }
