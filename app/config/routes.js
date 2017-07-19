require('../styles/style.sass')

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
<<<<<<< HEAD
import Header from '../components/Header.js';
import Meeting from '../containers/Meeting.js'
=======
import Header from '../components/Header';
import meetingTest from '../components/meetingTest';
>>>>>>> e4c535b461c66fd68945cf6699b48acfc4a66a11
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MeetingForm from '../components/MeetingForm';

var routes = (
	<MuiThemeProvider>
		<Router>
			<div>
				<Route path="/" component={Header} />
<<<<<<< HEAD
				<Route path="/" component={Meeting} />
=======
				<Route path="/" component={MeetingForm} />
				<Route path="/test" component={meetingTest} />
>>>>>>> e4c535b461c66fd68945cf6699b48acfc4a66a11
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
