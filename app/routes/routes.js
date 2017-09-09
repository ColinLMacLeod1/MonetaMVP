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
import App from '../containers/App';
import Printing from '../components/Printing.js'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6699ff',
		accent1Color: '#ffcc33'
  }
});

var routes = (
	<MuiThemeProvider muiTheme={muiTheme}>
		<Router>
			<div>
				<Route exact path="/" component={App}/>
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
