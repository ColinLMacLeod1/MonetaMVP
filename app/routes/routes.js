require('../styles/style.sass')

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
import Meeting from '../containers/Meeting.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MeetingForm from '../components/MeetingForm';
import Repository from '../containers/Repository';
import Login from '../containers/Login';
import Home from '../containers/Home';
import App from '../containers/App';

var routes = (
	<MuiThemeProvider>
		<Router>
			<div>
				<Route exact path="/" component={App}/>
				<Route path="/full" component={App} />
				<Route path="/home" component={Home} />
				<Route path="/meeting" component={Meeting} />
				<Route path="/repository" component={Repository} />
				<Route path="/login" component={Login} />
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
