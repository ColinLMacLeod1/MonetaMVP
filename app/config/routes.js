require('../styles/style.sass')

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
import Header from '../components/Header.js';
import Meeting from '../containers/Meeting.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MeetingForm from '../components/MeetingForm';
import RepoUser from '../containers/RepoUser';
import Repository from '../containers/Repository'
import CreateDB from '../containers/CreateDB';
import Login from '../containers/Login';
import Home from '../containers/Home'

var routes = (
	<MuiThemeProvider>
		<Router>
			<div>
				<Route path="/" component={Header} />
				<Route  exact path="/" component={Login} history={history} />
				<Route path="/home" component={Home} />
				<Route path="/meeting" component={Meeting} />
				<Route path="/repo" component={RepoUser} />
				<Route path="/popDB" component={CreateDB} />
				<Route path="/repository" component={Repository} />
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
