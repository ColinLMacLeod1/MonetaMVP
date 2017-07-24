import React from 'react';
import SearchC from './SearchC'

export default class RepoUser extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: 'colinlmacleod1'
		}
	}
  render() {
    return (
      <SearchC username={this.state.username} />
    )
  }
}
