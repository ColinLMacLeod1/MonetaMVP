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
				<Route path="/full" component={App} />
				<Route path="/home" component={Home} />
				<Route path="/meeting" component={Meeting} />
				<Route path="/repository" component={Repository} />
				<Route path="/login" component={Login} />
				<Route path="/print" component={Printing} />
	    </div>
		</Router>
	</MuiThemeProvider>
);

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

render(routes, document.getElementById('root'));
