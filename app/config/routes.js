require('../styles/style.sass')

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
import Header from '../components/Header.js';
import Meeting from '../containers/Meeting.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var routes = (
	<MuiThemeProvider>
		<Router>
			<div>
				<Route path="/" component={Header} />
				<Route path="/" component={Meeting} />
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
