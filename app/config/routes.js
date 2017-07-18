import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,
		Route
		} from 'react-router-dom';
import Header from '../components/Header.js';


var routes = (
	<Router>
		<div>
			<Route path="/" component={Header} />
    </div>
	</Router>
);

render(routes, document.getElementById('root'));
