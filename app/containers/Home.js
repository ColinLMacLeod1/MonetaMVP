import React from 'react';
import Help from '../components/Help'
import {Tabs, Tab} from 'material-ui/Tabs'
import SearchC from '../containers/SearchC'
import Meeting from '../containers/Meeting'
import Repository from '../containers/Repository'
export default class Home extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: "colinlmacleod1",
      page:'login'
		}
    this.toSignUp = this.toSignUp.bind(this)

	}
  toSignUp(){
    this.setState({
      page:'signup'
    })
  }
  login(user){
    this.setState({
      page:'App',
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
    return (
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
    )
  }
}
