import React from 'react';
import Help from '../components/Help'
import {Tabs, Tab} from 'material-ui/Tabs'
import RepoUser from '../containers/RepoUser'
import Meeting from '../containers/Meeting'

export default class Home extends React.Component {
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
        <Tab label="Help">
          <Help />
        </Tab>
      </Tabs>
    )
  }
}
