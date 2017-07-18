import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
import Header from '../components/Header.js';
import meetingTest from '../components/meetingTest'


var routes = (
	<Router>
		<div>
			<Route path="/" component={Header} />
			<Route path="/" component={meetingTest} />
    </div>
	</Router>
);

render(routes, document.getElementById('root'));
