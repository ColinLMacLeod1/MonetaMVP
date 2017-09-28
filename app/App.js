import React from 'react'
import {Tab, Tabs} from 'material-ui/Tabs'

import Header from './containers/Header.js'
import Home from './containers/Home.js'
import Footer from './containers/Footer.js'
import PrivacyTermsComponent from './components/PrivacyTermsComponent.js'


import Meeting from './containers/Meeting'
import Repository from './containers/Repository'
import Help from './components/Help'
import Feedback from './components/Feedback'


export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: 'none',
      page:'Home'
		}

    this.handlePageChange=this.handlePageChange.bind(this)
    this.sucessfulLogin = this.sucessfulLogin.bind(this)
	}

  handlePageChange (page) {
    console.log('handlePageChange() (App.js)');
    this.setState({page:page});
  }

  sucessfulLogin (user) {
    this.setState({page: 'App', username: user});
    console.log('you have logged in: ' + this.state.username);
  }

  dontdeletethis() {
    <div>
      <Header username={this.state.username} page={this.state.page} inside={true}/>
      <Tabs>
        <Tab label="New Meeting">
          <Meeting username={this.state.username} />
        </Tab>
        <Tab label="My Meetings">
          <Repository username={this.state.username}/>
        </Tab>
        <Tab label="Help">
          <Help />
        </Tab>
      </Tabs>
    </div>
  }

  render() {
    console.log(this.state.page)
    let feedbackTab = null;
    if(this.state.username == 'colin' || this.state.username == 'team@monettatech.com'){
      console.log('colin signed in')
      feedbackTab = (
        <Tab label='Feedback'>
          <Feedback />
        </Tab>
      )
    }
    switch (this.state.page) {
      case 'Home':
        return(
        <div>
          <Header handlePageChange={this.handlePageChange} inside={false} login={this.sucessfulLogin}/>
          <Home />
          <Footer handlePageChange={this.handlePageChange}/>
        </div>
      )

      case 'PrivacyTerms':
      return(
        <div>
          <Header handlePageChange={this.handlePageChange} inside={false}/>
          <PrivacyTermsComponent/>
          <Footer handlePageChange={this.handlePageChange}/>
        </div>
      )

      case 'App':
      return(
        <div>
           <Header username={this.state.username} inside={true} page={this.state.page}/>
           <Tabs>
             <Tab label="New Meeting">
               <Meeting username={this.state.username} />
             </Tab>
             <Tab label="My Meetings">
               <Repository username={this.state.username}/>
             </Tab>
             <Tab label="Help">
               <Help />
             </Tab>
             {feedbackTab}
           </Tabs>
        </div>
      )
    }
  }
}
