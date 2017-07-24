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
import Repo from '../containers/Repo';
import Repository from '../containers/Repository'
import CreateDB from '../containers/CreateDB';
import Login from '../containers/Login'

var routes = (
	<MuiThemeProvider>
		<Router>
			<div>
				<Route path="/" component={Header} />
				<Route path="/meeting" component={Meeting} />
				<Route path="/repo" component={Repo} />
				<Route path="/popDB" component={CreateDB} />
				<Route path="/repository" component={Repository} />
				<Route path="/login" component={Login} />
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
