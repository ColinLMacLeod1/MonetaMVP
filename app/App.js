import React from 'react'
import {Tab, Tabs} from 'material-ui/Tabs'
import Dialog from 'material-ui/Dialog'
import Header from './containers/Header.js'
import Home from './containers/Home.js'
import FooterComponent from './components/FooterComponent.js'
import PrivacyTermsComponent from './components/PrivacyTermsComponent.js'
import Meeting from './containers/Meeting'
import Repository from './containers/Repository'
import Help from './containers/Help'
import Feedback from './containers/Feedback'


export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: 'none',
      page:'Home',
      tabValue: 'a',
      code: '',
      PTermsAct: false
		}

    this.handlePageChange=this.handlePageChange.bind(this)
    this.handleTabChange=this.handleTabChange.bind(this)
    this.sucessfulLogin = this.sucessfulLogin.bind(this)
    this.hasRefresh=this.hasRefresh.bind(this)
    this.handlePTerms=this.handlePTerms.bind(this)
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

  sucessfulLogin (user) {
    this.setState({page: 'App', username: user});
    console.log('you have logged in: ' + this.state.username);
  }


  handlePTerms () {
    if (!this.state.PTermsAct) {
    this.setState({PTermsAct: true});
    } else {
    this.setState({PTermsAct: false});
    }
  }


  render() {
    let feedbackTab = null;
    if(this.state.username == 'colin' || this.state.username == 'team@monettatech.com'){
      console.log('colin signed in')
      feedbackTab = (
        <Tab label='Feedback' value='d'>
          <Feedback />
        </Tab>
      )
    }

    let PTerms = (<div></div>);

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
            handlePageChange={this.handlePageChange}
            inside={false}
            login={this.sucessfulLogin}
            handlePTerms={this.handlePTerms}
            />

          <Home />
          <FooterComponent handlePTerms={this.handlePTerms}/>
          {PTerms}
        </div>
      )

      case 'App':
      return(
        <div>

           <Header
            username={this.state.username}
            inside={true}
            page={this.state.page}
            handlePageChange={this.handlePageChange}
            handlePTerms={this.handlePTerms}
            />

           <Tabs value={this.state.tabValue} onChange={this.handleTabChange}>
             <Tab label="New Meeting" value='a'>
               <Meeting username={this.state.username} handleDirectToRepo={this.handleTabChange}/>
             </Tab>
             <Tab label="My Meetings" value='b'>
               <Repository username={this.state.username} code={this.state.code} handleRefresh={this.hasRefresh}/>
             </Tab>
             <Tab label="Help" value='c'>
               <Help />
             </Tab>
             {feedbackTab}
           </Tabs>
           {PTerms}
        </div>
      )
    }
  }
}
