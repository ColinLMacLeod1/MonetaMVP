import React from 'react';
import SearchC from './SearchC'

export default class Repo extends React.Component {
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
