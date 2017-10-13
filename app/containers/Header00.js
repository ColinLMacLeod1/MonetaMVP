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

import HeaderComponent from '../components/HeaderComponent.js'
import HeaderInsideComponent from '../components/HeaderInsideComponent.js'
import Login from './Login.js'
import MonettaLogo from '../assets/images/MonettaLogo.png'
import MonettaLogoNotif from '../assets/images/MonettaLogoNotif.png'

const PromptQuestions = require('./Data/PromptQuestions.js')


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
      sent: false,
      logoClick: 'Notif',
      openQuestion: false,
      promptQuestion: '',
      questionAnswer: 0,
      answeredQs: [0],
      answersLeft: true,
      qnumber: 0
      }
    this.handleHome=this.handleHome.bind(this)
    this.handleActivationLogin=this.handleActivationLogin.bind(this)
    this.handleActivationSignup=this.handleActivationSignup.bind(this)
    this.processLoginRequest=this.processLoginRequest.bind(this)
    this.changeParentState = this.changeParentState.bind(this)
		this.sendFeedback = this.sendFeedback.bind(this)
    this.feedbackButton = this.feedbackButton.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.handleNotifSubmit=this.handleNotifSubmit.bind(this)
    this.handleQuestion=this.handleQuestion.bind(this)
    this.handleLogoClick=this.handleLogoClick.bind(this)
    this.handleAnswerChange=this.handleAnswerChange.bind(this)
    this.handleFindQ=this.handleFindQ.bind(this)
    this.handleCheckQs=this.handleCheckQs.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({username: nextProps.username})
    // every time header component receives props, it checks to see if user is logged in and if so performs initializing requests
    if (nextProps.loggedin) {
      this.handleCheckQs()
    }
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
      suggestion: 'QUESTION - ' + this.state.promptQuestion,
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

  ///////////////////////////////////////////////////////////






  handleFindQ () {

    console.log('handleFindQ()')
    var answeredQs = this.state.answeredQs
    // this function will go one by one to find the next question that the user has not answered
    // this function relies heavily on the structure of the array of questions, it must be in order and it must be starting from 0
    if (answeredQs === [0]) {
      this.setState({qnumber: 0})
    }
    if (answeredQs.length !== PromptQuestions.length) {
      this.setState({qnumber: answeredQs.length, question: PromptQuestions[answeredQs.length]})
    } else {
      this.setState({answersLeft: false})
    }
  }


  handleCheckQs () {
    console.log('handleCheckQs()')
    // Why is this taking so long
    axios.post('http://localhost:8080/promptqs',{
      username: this.state.username
    })
    .then(function(result){
      console.log(result);
      this.setState({answeredQs: result.data.promptqs})
      console.log('answeredQs updated')
    })
    .catch(function(err){
      console.log(err);
    })
  }




  /////////////////////////////////////////////////////////

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
          <h1> {this.state.promptQuestion} </h1>
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
