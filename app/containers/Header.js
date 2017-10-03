import React from 'react'
import axios from 'axios'
import Dialog from 'material-ui/Dialog'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'

import HeaderComponent from '../components/HeaderComponent.js'
import HeaderInsideComponent from '../components/HeaderInsideComponent.js'
import Login from './Login.js'





export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginDialog: false,
      signupDialog: false,
      errors: {},
      username: '',
      password: '',
      issue:'',
			suggestion:'',
			likes:'',
      openFeedback:false,
      sent: false
      }
    this.handleHome=this.handleHome.bind(this)
    this.handleActivationLogin=this.handleActivationLogin.bind(this)
    this.handleActivationSignup=this.handleActivationSignup.bind(this)
    this.processLoginRequest=this.processLoginRequest.bind(this)
    this.changeParentState = this.changeParentState.bind(this)
		this.sendFeedback = this.sendFeedback.bind(this)
    this.feedbackButton = this.feedbackButton.bind(this)
    this.handlePrivacyTerms = this.handlePrivacyTerms.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }


  handleHome () {
    this.props.handlePageChange('Home');
  }

  handlePrivacyTerms () {
    console.log('Coming Soon');
  }

  handleActivationLogin () {
    if (!this.state.loginDialog) {
    this.setState({loginDialog: true});
    } else {
    this.setState({loginDialog: false});
    }
  }
  handleActivationSignup () {
    if (!this.state.signupDialog) {
    this.setState({signupDialog: true});
    } else {
    this.setState({signupDialog: false});
    }
  }

  changeParentState (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  processLoginRequest () {

    const self = this;
		axios.post('https://monettatech.com/login',
        {
				username: self.state.username,
				password: self.state.password
        }
			)
			.then (function(res) {
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
  	const self = this;
  	axios.post('https://monettatech.com/feedback', {
  			username: self.props.username,
  			date: (new Date()).toString(),
        issue: self.state.issue,
  			suggestion: self.state.suggestion,
  			likes: self.state.likes
  		  }
    )
  	.then(function(res) {
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
  	this.setState({openFeedback: false})
    this.setState({sent: true})
  }

  feedbackButton () {
    this.setState({openFeedback: !this.state.openFeedback});
  }

  handleRequestClose () {
    this.setState({sent: false});
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
            handlePTerms={this.props.handlePTerms}
            handleHome={this.handleHome}
            />
          <div className='header'>
            <Drawer
              open={this.state.openFeedback}
              docked={false}
              onRequestChange={this.feedbackButton}
              width={'20%'}
              containerClassName="drawer"
              >
              <Subheader>Send us your Feedback!</Subheader>
              <TextField
                hintText="Issues"
                multiLine={true}
                rows={1}
                rowsMax={10}
                name='issue'
                value={this.state.issue}
                onChange={this.changeParentState}
                style={{width:'16vw'}}
              />
              <TextField
                hintText="Suggestions"
                multiLine={true}
                rows={1}
                rowsMax={10}
                name='suggestion'
                value={this.state.suggestion}
                onChange={this.changeParentState}
                style={{width:'16vw'}}

              />
              <TextField
                hintText="Likes"
                multiLine={true}
                rows={1}
                rowsMax={10}
                name='likes'
                value={this.state.likes}
                onChange={this.changeParentState}
                style={{width:'16vw'}}

              />
              <FlatButton
                label="Send"
                primary={true}
                onClick={this.sendFeedback}
                fullWidth={true} />
            </Drawer>
          </div>
          <Snackbar
                open={this.state.sent}
                message="Thank you for the feedback!"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
              />
        </div>
      )

      case false:
      return (
        <div>
          <HeaderComponent
            handleHome={this.handleHome}
            handleActivationLogin={this.handleActivationLogin}
            loginDialog={this.state.loginDialog}
            handleActivationSignup={this.handleActivationSignup}
            signupDialog={this.state.signupDialog}
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
