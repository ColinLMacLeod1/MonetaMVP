import React from 'react'
import axios from 'axios'
import {Tab, Tabs} from 'material-ui/Tabs'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Card from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import List from 'material-ui/List'
import Snackbar from 'material-ui/Snackbar'

import Header from './containers/Header.js'
import FooterComponent from './components/FooterComponent.js'
import PrivacyTermsComponent from './components/PrivacyTermsComponent.js'
import Meeting from './containers/Meeting.js'
import Repository from './containers/Repository.js'
import Help from './containers/Help.js'
import Feedback from './containers/Feedback.js'
import PromptQComponent from './components/PromptQComponent.js'
import HomeComponent from './components/HomeComponent'



export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: 'colin',
      date: '',
      issues: '',
      suggestions: '',
      likes: '',
      page: 'Home',
      tabValue: 'a',
      code: '',
      PTermsAct: false,
      data: {},
      promptFb: false,
      openFeedback:false,
      sent: false,
      loggedin: false,
      alphaActivation: false,
      recipientsOpen: false,
      recipientsTemp: '',
      recipients: [],
      snackOpen: false,
		}

    this.handlePageChange=this.handlePageChange.bind(this)
    this.handleTabChange=this.handleTabChange.bind(this)
    this.enterLogin = this.enterLogin.bind(this)
    this.hasRefresh=this.hasRefresh.bind(this)
    this.handlePTerms=this.handlePTerms.bind(this)
    this.handlePromptFb=this.handlePromptFb.bind(this)
    this.sendFeedback=this.sendFeedback.bind(this)
    this.changeParentState=this.changeParentState.bind(this)
    this.handleAlphaActivation=this.handleAlphaActivation.bind(this)

    this.prepareEmail=this.prepareEmail.bind(this)
    this.itemAdd=this.itemAdd.bind(this)
    this.itemChange=this.itemChange.bind(this)
    this.itemDelete=this.itemDelete.bind(this)
    this.changeText=this.changeText.bind(this)
    this.toEmail=this.toEmail.bind(this)

	}

  handlePageChange (pg) {
    this.setState({page:pg});
  }

  handleTabChange (tabVal, bool) {
    this.setState({tabValue:tabVal});

    if (bool == true) {
      this.setState({code: 'refresh'})
    }
  }

  hasRefresh () {
      this.setState({code: ''})
  }

  enterLogin (user) {
    this.setState({page: 'App', username: user, loggedin: true});
  }

  handlePTerms () {
    this.setState({PTermsAct: !this.state.PTermsAct})
  }

  handleAlphaActivation () {
    this.setState({alphaActivation: !this.state.alphaActivation})
  }

  handlePromptFb () {
    this.setState({promptFb: !this.state.promptFb});
  }

  changeParentState (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  itemAdd(){
    var newArray = this.state.recipients
    newArray.unshift(this.state.recipientsTemp)
    this.setState({recipients: newArray, recipientsTemp: ''})
  }

  itemChange(item, index){
    var newArray = this.state.recipients
    newArray[index] = item
    this.setState({recipients: newArray})
  }

  itemDelete(index){
    var newArray = this.state.recipients
    newArray.splice(index,1)
    this.setState({recipients: newArray});
  }

  changeText (e) {
    this.setState({recipientsTemp: e.target.value});
  }

  toEmail(data) {
    const self = this
    axios.post('http://localhost:3000/emailMonettaMinutes',{
      title: self.state.data.title,
      type: self.state.data.type,
      location: self.state.data.location,
      date: self.state.data.date,
      members: self.state.data.members,
      decisions: self.state.data.decisions,
      actions: self.state.data.actions,
      minutes: self.state.data.minutes,
      recipients: self.state.recipients
    }).then(function(result){
      self.setState({recipientsTemp: '', recipients: [], snackOpen: true})
      self.prepareEmail()
      console.log('sent email')
    }).catch(function(err){
      console.log(err)
    })
  }

  prepareEmail (dataVal) {
    if (this.state.recipientsOpen === false){
    this.setState({recipientsOpen: true, data: dataVal})
  } else {
    this.setState({recipientsOpen: false, data: {} })
  }


  }


  sendFeedback () {
    const self = this;
    axios.post('http://localhost:3000/feedback', {
        username: self.state.username,
        date: (new Date()).toString(),
        issue: self.state.issues,
        suggestion: self.state.suggestions,
        likes: self.state.likes
        }
    )
    .then(function(res) {
      self.setState({
        issues:'',
        suggestions:'',
        likes:''
        })
      }
    )
    .catch(function(error) {
      }
    )
    this.handlePromptFb()
  }

  render() {
    let feedbackTab = null;

    let PTerms = null;

    let promptFeedback = (
      <Dialog modal={false} open={this.state.promptFb} onRequestClose={this.handlePromptFb} autoScrollBodyContent={true}>
          <PromptQComponent
            issues={this.state.issues}
            suggestions={this.state.suggestions}
            likes={this.state.likes}
            changeParentState={this.changeParentState}
            sendFeedback={this.sendFeedback}
            />
      </Dialog>
    );

    let EmailDiag = (
      <div>
      <div className='EmailDialog'>
        <Dialog modal={false} open={this.state.recipientsOpen} onRequestClose={this.prepareEmail}>
          <h1> Please enter recipient emails</h1>
          <div className='inputField'>
            <TextField
              floatingLabelText='Emails (hit "Enter" to add an email)'
              name='recipientsTemp'
              multiLine={true}
              value={this.state.recipientsTemp}
              style={{width: '100%'}}
              onChange={this.changeText}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  this.itemAdd();
                }}}
            />
          </div>
          <List>
            {this.state.recipients.map((item, index) =>
              <div key={index} className='recipientEmail' style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}>
                <TextField
                  name='recipients'
                  value={item}
                  onChange={(event,newValue) => this.itemChange(newValue, index)}
                  style={{width: '60%'}}
                  />
                <p onClick={(e) => this.itemDelete(index)}>x</p>
              </div>
            )}
          </List>
          <div>
            <RaisedButton label='Send Email' onClick={this.toEmail} primary={true}/>
          </div>
        </Dialog>
      </div>
      <Snackbar
        open={this.state.snackOpen}
        message={'Email Sent!'}
        autoHideDuration={4000}
        onRequestClose={()=> this.setState({snackOpen: false})}
        contentStyle={{display: 'flex', justifyContent: 'center'}}
        />
      </div>
    );

    if(this.state.username == 'colin' || this.state.username == 'team@monettatech.com'){
      feedbackTab = (
        <Tab label='Admin' value='d'>
          <Feedback />
        </Tab>
      )
    }

    if (this.state.PTermsAct) {
      PTerms = (
        <Dialog modal={false} open={this.state.PTermsAct} onRequestClose={this.handlePTerms} autoScrollBodyContent={true}>
          <div>
            <PrivacyTermsComponent />
          </div>
        </Dialog>
      )
    }

    switch (this.state.page) {
      case 'Home':
        return(
        <div>

          <Header
            loggedin={this.state.loggedin}
            username={this.state.username}
            handlePageChange={this.handlePageChange}
            inside={false}
            enterLogin={this.enterLogin}
            handlePTerms={this.handlePTerms}
            />

          <HomeComponent
            handleAlphaActivation = {this.handleAlphaActivation}
            alphaActivation = {this.state.alphaActivation}
            />
          <FooterComponent handlePTerms={this.handlePTerms}/>
          {PTerms}
        </div>
      )

      case 'App':
      return(
        <div>

           <Header
              loggedin={this.state.loggedin}
              username={this.state.username}
              inside={true}
              page={this.state.page}
              enterLogin={this.enterLogin}
              handlePageChange={this.handlePageChange}
              handlePTerms={this.handlePTerms}
              />

           <Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
             <Tab label="New Meeting" value='a'>
               <Meeting
                username={this.state.username}
                handleDirectToRepo={this.handleTabChange}
                handlePromptFb={this.handlePromptFb}
                prepareEmail={this.prepareEmail}
                />
             </Tab>
             <Tab label="My Meetings" value='b'>
               <Repository
                username={this.state.username}
                code={this.state.code}
                handleRefresh={this.hasRefresh}
                prepareEmail={this.prepareEmail}
                />
               {promptFeedback}
             </Tab>
             <Tab label="Help" value='c'>
               <Help />
             </Tab>
             {feedbackTab}
           </Tabs>
           {PTerms}
           {EmailDiag}

        </div>
      )

      case 'Sandbox':
      return(
        <div>
          <RaisedButton label='Test Email' onClick={this.testEmail} />
        </div>
      )
    }
  }
}
