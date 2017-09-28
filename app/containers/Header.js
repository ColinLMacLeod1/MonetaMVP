import React from 'react'
import axios from 'axios'
import HeaderComponent from '../components/HeaderComponent.js'
import HeaderInsideComponent from '../components/HeaderInsideComponent.js'


export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      act: false,
      errors: {},
      username: '',
      password: '',
      issue:'',
			suggestion:'',
			likes:'',
      openFeedback:false
      }
    this.handleHome=this.handleHome.bind(this)
    this.handleActivation=this.handleActivation.bind(this)
    this.processLoginRequest=this.processLoginRequest.bind(this)

    this.changeParentState = this.changeParentState.bind(this)
		this.sendFeedback = this.sendFeedback.bind(this)
    this.feedbackButton = this.feedbackButton.bind(this)
  }


  handleHome () {
    console.log('handleHome() (Header.js)');
    this.props.handlePageChange('Home');
  }

  handleActivation () {
    console.log('handleActivation() (Header.js)');
    if (!this.state.act) {
    this.setState({act: true});
    console.log('Open Dialog');
    } else {
    this.setState({act: false});
    console.log('Close Dialog');
    }
  }

  changeParentState (event) {
    console.log('changeUser() (Header.js)');
    this.setState({[event.target.name]: event.target.value});
    console.log({[event.target.name]: event.target.value});
  }

  processLoginRequest () {
    console.log('processLoginRequest() (Header.js)');
    console.log('Username: ' + this.state.username);
    console.log('Password: ' + this.state.password);

    const self = this;
		axios.post('https://monettatech.com/login',
        {
				username: self.state.username,
				password: self.state.password
        }
			)
			.then (function(res) {
				console.log(res.data)
        if(res.data != 'User not found'){
          var errors = self.state.errors;
          errors.username = "";
          self.setState( {errors:errors} )
        }

        if (res.data != 'User Exists') {
          var errors = self.state.errors;
          errors.password = "";
          self.setState( {errors:errors} )
        }

				if(res.data != 'User not found' && res.data != 'User Exists'){
					console.log('Login Successful')
          self.props.login(self.state.username)

          //self.props.history.push('/home')
				} else if(res.data == 'User not found') {
          var errors = self.state.errors;
          errors.username = "User not found";
          self.setState( {errors:errors} )

        } else if(res.data == 'User Exists'){
            var errors = self.state.errors;
            errors.password = "Password does not match";
            self.setState( {errors:errors} )
        }

			}
      )
			.catch(function(error) {
				console.log(error)
			  }
      )
  }

  sendFeedback () {
  	console.log('Issue: ' +this.state.issue,'Suggestion: '+this.state.suggestion, 'Likes: '+this.state.likes)
  	const self = this;
  	axios.post('https://monettatech.com/feedback', {
  			username: self.props.username,
  			date: (new Date()).getTime(),
        issue: self.state.issue,
  			suggestion: self.state.suggestion,
  			likes: self.state.likes
  		  }
    )
  	.then(function(res) {
  		console.log(res.data)
      self.setState({
        issue:'',
  			suggestion:'',
  			likes:''
        })
  		console.log('Feedback Sent')
  	  }
    )
  	.catch(function(error) {
      console.log(error)
  	  }
    )
  	this.setState({open: false})
  }

  feedbackButton () {
    this.setState({openFeedback: [!this.state.openFeedback]});
  }

  render () {
    switch (this.props.inside) {
      case true:
      return (
        <div>
          <HeaderInsideComponent
            username={this.state.username}
            page={this.state.page}
            feedbackButton={this.feedbackButton}
            openFeedback={this.state.openFeedback}
            onChange={this.changeParentState}
            issue={this.state.issue}
            suggestion={this.state.suggestion}
            likes={this.state.likes}
            sendFeedback={this.sendFeedback}

            />
        </div>
      )

      case false:
      return (
        <div>
          <HeaderComponent
            handleHome={this.handleHome}
            handleActivation={this.handleActivation}
            act={this.state.act}
            errors={this.state.errors}
            onChange={this.changeUser}
            username={this.state.username}
            password={this.state.password}
            onClick={this.processLoginRequest}
            login={this.props.login}
            />
        </div>
      )
    }
  }
}
