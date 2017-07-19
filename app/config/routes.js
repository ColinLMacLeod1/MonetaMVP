require('../styles/style.sass')

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
import Header from '../components/Header.js';
import meetingTest from '../components/meetingTest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var routes = (
	<MuiThemeProvider>
		<Router>
			<div>
				<Route path="/" component={Header} />
				<Route path="/" component={meetingTest} />
	    </div>
		</Router>
	</MuiThemeProvider>
);

render(routes, document.getElementById('root'));
