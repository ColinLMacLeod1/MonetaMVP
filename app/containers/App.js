import React from 'react';
import Help from '../components/Help'
import {Tabs, Tab} from 'material-ui/Tabs'
import SearchC from '../containers/SearchC'
import Meeting from '../containers/Meeting'
import Repository from '../containers/Repository'
import Login from './Login'
import SignUp from './SignUp'
import Header from '../components/Header'



export default class App extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: "colinlmacleod1",
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
    switch(this.state.page) {
      case 'login':
        return (
          <div>
            <Login login={this.login} toSignUp={this.toSignUp}/>
          </div>
        );
      case 'signup':
        return (
          <div>
            <SignUp login={this.login} toLogin={this.toLogin}/>
          </div>
        );
      case 'app':
        return (
          <div>
            <Tabs>
              <Tab label="Meeting">
                <Meeting username={this.state.username} />
              </Tab>
              <Tab label="Repository">
                <Repository username={this.state.username}/>
              </Tab>
              <Tab label="Help">
                <Help />
              </Tab>
            </Tabs>
          </div>
        );
    }
  }
}
