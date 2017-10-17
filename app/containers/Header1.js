import React from 'react'
import axios from 'axios'
import Dialog from 'material-ui/Dialog'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import {PromptQuestions} from './Data/PromptQuestions.js'
import HeaderComponent from '../components/HeaderComponent.js'
import HeaderInsideComponent from '../components/HeaderInsideComponent.js'
import LoginComponent from '../components/LoginComponent.js'
import SignupComponent from '../components/SignupComponent.js'
import MonettaLogo from '../assets/images/MonettaLogo.png'
import MonettaLogoNotif from '../assets/images/MonettaLogoNotif.png'


export default class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginSignupDialog: false,
      logSig: 'login',
      errors: {},
      formUsername: '',
      formPassword: '',
      formCode: '',
      issue:'',
			suggestion:'',
			likes:'',
      openFeedback:false,
      sent: false,
      logoClick: 'Notif',
      openQuestion: false,
      questionStr: 'Please rate the quality of the voice recognition:',
      questionAnswer: 0,
      errors: {}
      }
    this.handleHome=this.handleHome.bind(this)
    this.handleLoginSubmit=this.handleLoginSubmit.bind(this)
    this.changeParentState = this.changeParentState.bind(this)
		this.sendFeedback = this.sendFeedback.bind(this)
    this.feedbackButton = this.feedbackButton.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleNotifSubmit=this.handleNotifSubmit.bind(this)
    this.handleQuestion=this.handleQuestion.bind(this)
    this.handleLogoClick=this.handleLogoClick.bind(this)
    this.handleAnswerChange=this.handleAnswerChange.bind(this)
    this.handleLogSigActivate=this.handleLogSigActivate.bind(this)
    this.handleSignupSubmit=this.handleSignupSubmit.bind(this)
    this.cleanUpForms=this.cleanUpForms.bind(this)
    this.handleUpdateQs=this.handleUpdateQs.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.loggedin) {
      this.handleUpdateQs(nextProps.username)
    }
  }

  handleUpdateQs (loggedUser) {
    console.log('in handleUpdateQs()')
    const self = this;
    axios.get('https://localhost:8080/updateqs', {
      username: 'test@thiago.com'
    }).then(function(result){
      console.log('in result of handleUpdateQs()')
      console.log(result)
    }).catch(function(error){
      console.log('in error of handleUpdateQs()')
      console.log(error)
    })
  }

  handleLoginSubmit () {
    const self = this;
		axios.post('https://monettatech.com/login',
        {
				username: self.state.formUsername,
				password: self.state.formPassword
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
          self.props.enterLogin(self.state.formUsername)
          self.cleanUpForms()
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

			})
			.catch(function(error) {
				console.log(error)
		  })
  }

  handleSignupSubmit() {
    const self = this;
		axios.post('https://monettatech.com/signup',
			{
				username: self.state.formUsername,
				password: self.state.formPassword,
        code: self.state.formCode
			}
			)
			.then(function(res) {
        if(res.data != 'User Exists'){
          var errors = self.state.errors;
          errors.email = "";
          self.setState({
              errors:errors
          })
        }
        if(res.data != 'Sign Up Unsuccessful'){
          var errors = self.state.errors;
          errors.password = "";
          self.setState({
              errors:errors
          })
        }
				if(res.data != 'Sign Up Unsuccessful' && res.data != 'User Exists' && res.data !="Code Already Used" && res.data !="Code Doesn't Exist"){
          self.props.enterLogin(self.state.formUsername)
          self.cleanUpForms()
          //self.props.history.push('/home')
				} else if(res.data == 'User Exists') {
          var errors = self.state.errors;
          errors.email = "User Already Exists";
          self.setState({
              errors:errors
          })
        } else if(res.data == "Code Already Used"){
          var errors = self.state.errors;
          errors.code = "Code Already Used";
          self.setState({
              errors:errors
          })
        } else if(res.data == "Code Doesn't Exist"){
          var errors = self.state.errors;
          errors.code = "Code Doesn't Exist";
          self.setState({
              errors:errors
          })
        } else {
            var errors = self.state.errors;
            errors.password = "Account didn't save properly";
            self.setState({
                errors:errors
            })
        }

			})
			.catch(function(error) {
				console.log(error)
			})

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

  handleLogSigActivate (val) {
    this.setState({
      loginSignupDialog: !this.state.loginSignupDialog,
      logSig: val
    })
    this.cleanUpForms()
  }

  cleanUpForms () {
    this.setState({formUsername: '', formPassword: '', formCode: ''})
  }

  changeParentState (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  feedbackButton () {
    this.setState({openFeedback: !this.state.openFeedback});
  }

  handleRequestClose () {
    this.setState({sent: false});
  }

  handleHome () {
    this.props.handlePageChange('Home');
  }

  handleNotifSubmit() {
    this.sendFeedback()
    this.handleQuestion()
    this.setState({logoClick: 'Home'})

  }

  handleAnswerChange (event, index, value) {

    this.setState({
      likes: 'NOTIFICATION PROMPT',
      suggestion: 'QUESTION - ' + this.state.questionStr,
      issue: 'ANSWER - ' + value,
      questionAnswer: value
    })
  }

  handleLogoClick () {
    console.log('inside')
    if (this.state.logoClick == 'Home') {
      this.handleHome()
    } else if (this.state.logoClick == 'Notif') {
      console.log('logoclick')
      this.setState({openQuestion: true})
    }
  }

  handleQuestion () {
    this.setState({openQuestion: !this.state.openQuestion});
  }

  render () {
    let logo = {}

    if (this.state.logoClick == 'Home') {
      logo = MonettaLogo
    } else if (this.state.logoClick == 'Notif') {
      logo = MonettaLogoNotif
    }

    var questionAndAnswer = (
      <div className='QuestionAndAnswer'>
        <div>
          <h1> {this.state.questionStr} </h1>
          <p> Great quality or no issues = 5 <br/> Low quality or many issues = 1 </p>
        </div>
        <div>
          <SelectField
            floatingLabelText="Rate out of 5"
            value={this.state.questionAnswer}
            onChange={this.handleAnswerChange}
          >
            <MenuItem value={1} primaryText="1" />
            <MenuItem value={2} primaryText="2" />
            <MenuItem value={3} primaryText="3" />
            <MenuItem value={4} primaryText="4" />
            <MenuItem value={5} primaryText="5" />
          </SelectField>
        </div>
        <div>
          <RaisedButton label='Submit' onClick={this.handleNotifSubmit} />
        </div>
      </div>
    )

    if (this.state.logSig === 'login') {
      var LogSig = (
        <LoginComponent
          handleLoginSubmit = {this.handleLoginSubmit}
          onChange = {this.changeParentState}
          username = {this.state.formUsername}
          password = {this.state.formPassword}
          errors = {this.state.errors}
        />
      )
    } else {
      var LogSig = (
        <SignupComponent
          handleSignupSubmit = {this.handleSignupSubmit}
          handleLogSigActivate = {this.handleLogSigActivate}
          onChange = {this.changeParentState}
          username = {this.state.formUsername}
          password = {this.state.formPassword}
          code = {this.state.formCode}
          errors = {this.state.errors}
        />
      )
    }



    switch (this.props.inside) {
      case true:
      return (
        <div>
          <HeaderInsideComponent
            username={this.props.username}
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
            changeParentState={this.changeParentState}
            sendFeedback={this.sendFeedback}
            sent={this.state.sent}
            handleRequestClose={this.handleRequestClose}
            questionAndAnswer={questionAndAnswer}
            openQuestion={this.state.openQuestion}
            handleQuestion={this.handleQuestion}
            handleLogoClick={this.handleLogoClick}
            logo={logo}
            />
        </div>
      )

      case false:
      return (
        <div>
          <HeaderComponent
            handleLogSigActivate={this.handleLogSigActivate}
            />
          <Dialog style={{width: '100%'}} modal={false} open={this.state.loginSignupDialog} onRequestClose={this.handleLogSigActivate}>
              <div className='LogSig'>
                {LogSig}
              </div>
          </Dialog>
        </div>
      )
    }
  }
}
