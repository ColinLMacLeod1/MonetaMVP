require('../styles/style.sass')

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
import Header from '../components/Header.js';
import Meeting from '../containers/Meeting.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MeetingForm from '../components/MeetingForm';
import SearchC from '../containers/SearchC';
import Repository from '../containers/Repository';
import CreateDB from '../containers/CreateDB';
import Login from '../containers/Login';
import Home from '../containers/Home';
import SignUp from '../containers/SignUp';
import App from '../containers/App';

var routes = (
	<MuiThemeProvider>
		<Router>
			<div>
				<Route path="/" component={Header} />
				<Route  exact path="/" component={Login} history={history} />
				<Route path="/full" component={App} />
				<Route path="/home" component={Home} />
				<Route path="/meeting" component={Meeting} />
				<Route path="/repo" component={SearchC} />
				<Route path="/popDB" component={CreateDB} />
				<Route path="/repository" component={Repository} />
				<Route path="/signup" component={SignUp} />
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
