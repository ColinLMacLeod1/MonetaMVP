import React from 'react';
import Help from '../components/Help'
import {Tabs, Tab} from 'material-ui/Tabs'
import SearchC from '../containers/SearchC'
import Meeting from '../containers/Meeting'

export default class Home extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: "colinlmacleod1"
		}
	}
  render() {
    return (
      <Tabs>
        <Tab label="Meeting">
          <Meeting username={this.state.username} />
        </Tab>
        <Tab label="Repository">
          <SearchC username={this.state.username}/>
        </Tab>
        <Tab label="Help">
          <Help />
        </Tab>
      </Tabs>
    )
  }
}
