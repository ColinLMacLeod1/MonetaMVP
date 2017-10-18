import React from 'react'
import axios from 'axios'
import {Tab, Tabs} from 'material-ui/Tabs'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Card from 'material-ui/Card'

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
      username: 'none',
      date: '',
      issues: '',
      suggestions: '',
      likes: '',
      page: 'Home',
      tabValue: 'a',
      code: '',
      PTermsAct: false,
      data: {
        title: 'Title',
        type: 'type',
        date: 'date',
        location: 'location',
        members: 'members',
        minutes: 'minutes',
        actions: 'actions',
        decisions: 'decisions'
      },
      promptFb: false,
      openFeedback:false,
      sent: false,
      loggedin: false,
      alphaActivation: false
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


  sendFeedback () {
    const self = this;
    axios.post('https://monettatech.com/feedback', {
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

    if(this.state.username == 'colin' || this.state.username == 'team@monettatech.com'){
      feedbackTab = (
        <Tab label='Feedback' value='d'>
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
                />
             </Tab>
             <Tab label="My Meetings" value='b'>
               <Repository
                username={this.state.username}
                code={this.state.code}
                handleRefresh={this.hasRefresh}
                />
               {promptFeedback}
             </Tab>
             <Tab label="Help" value='c'>
               <Help />
             </Tab>
             {feedbackTab}
           </Tabs>
           {PTerms}

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
