import React from 'react';
import Help from '../components/Help'
import {Tabs, Tab} from 'material-ui/Tabs'
import SearchC from '../containers/SearchC'
import Meeting from '../containers/Meeting'
import Repository from '../containers/Repository'
import Login from './Login'
import SignUp from './SignUp'
import Header from '../components/Header'
import Feedback from '../components/Feedback'


export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: "Not logged in",
      page:'login'
		}
    this.toSignUp = this.toSignUp.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.toLogin = this.toLogin.bind(this)
	}
  toSignUp(){
    console.log('signup')
    this.setState({
      page:'signup'
    })
  }
  toLogin(){
    console.log('login')
    this.setState({
      page:'login'
    })
  }
  login(user){
    this.setState({
      page:'app',
      username:user
    })
  }
  logout(){
    this.setState({
      username:null,
      page:'login'
    })
  }
  render() {
    let feedbackTab = null;
    if(this.state.username == 'colin' || this.state.username == 'team@monettatech.com'){
      console.log('colin signed in')
      feedbackTab = (
        <Tab label='Feedback'>
          <Feedback />
        </Tab>
      )
    }
    switch(this.state.page) {
      case 'login':
        return (
          <div>
            <Header username={this.state.username} />
            <Login login={this.login} toSignUp={this.toSignUp}/>
          </div>
        );
      case 'signup':
        return (
          <div>
            <Header username={this.state.username} />
            <SignUp login={this.login} toLogin={this.toLogin}/>
          </div>
        );
      case 'app':
        return (
          <div>
            <Header username={this.state.username} />
            <Tabs>
              <Tab label="Meeting">
                <Meeting username={this.state.username} />
              </Tab>
              <Tab label="Repository">
                <Repository username={this.state.username}/>
              </Tab>
              {feedbackTab}
            </Tabs>
          </div>
        );
    }
  }
}
