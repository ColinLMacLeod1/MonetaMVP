import React from 'react';
import Home from '../components/Home'
import {Tabs, Tab} from 'material-ui/Tabs'
import RepoUser from '../containers/RepoUser'
import Meeting from '../containers/Meeting'

export default class HomeUser extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: 'colinlmacleod1'
		}
	}
  render() {
    return (
      <Tabs>
        <Tab label="Meeting">
          <Meeting />
        </Tab>
        <Tab label="Repository">
          <RepoUser />
        </Tab>
        <Tab label="Home">
          <Home />
        </Tab>
      </Tabs>
    )
  }
}
