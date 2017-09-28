import React from 'react'
import {Tab, Tabs} from 'material-ui/Tabs'

import Header from './containers/Header.js'
import Home from './containers/Home.js'
import Footer from './containers/Footer.js'
import PrivacyTermsComponent from './components/PrivacyTermsComponent.js'


import Meeting from './containers/Meeting'
import Repository from './containers/Repository'
import Help from './components/Help'


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

  handlePageChange (e) {
    console.log('handlePageChange() (App.js)');
    this.setState({page:e});
  }

  sucessfulLogin (e) {
    this.setState({page: 'App', username: [e]});
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
          <h2> exiting homepage </h2>
        </div>
      )
    }
  }
}
