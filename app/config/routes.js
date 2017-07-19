require('../styles/style.sass')

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
import Header from '../components/Header';
import meetingTest from '../components/meetingTest';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MeetingForm from '../components/MeetingForm';

var routes = (
	<MuiThemeProvider>
		<Router>
			<div>
				<Route path="/" component={Header} />
				<Route path="/" component={MeetingForm} />
				<Route path="/test" component={meetingTest} />
	    </div>
		</Router>
	</MuiThemeProvider>
);

render(routes, document.getElementById('root'));
