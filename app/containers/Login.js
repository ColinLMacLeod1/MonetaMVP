import React, { PropTypes } from 'react';
import LoginComponent from '../components/LoginComponent.js';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      },
      open: false
    };

    this.processLoginForm = this.processLoginForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
	 	this.setState({open: true});
	};
  handleClose() {
		this.setState({open: false});
	};
  processLoginForm() {
    const self = this;
		axios.post('https://monettatech.com/login',
			{
				username: self.state.user.email,
				password: self.state.user.password
			}
			)
			.then(function(res) {
        if(res.data != 'User not found'){
          var errors = self.state.errors;
          errors.email = "";
          self.setState({
              errors:errors
          })
        }
        if(res.data != 'User Exists'){
          var errors = self.state.errors;
          errors.password = "";
          self.setState({
              errors:errors
          })
        }
				if(res.data != 'User not found' && res.data != 'User Exists'){
          self.props.login(self.state.user.email)
          //self.props.history.push('/home')
				} else if(res.data == 'User not found') {
          var errors = self.state.errors;
          errors.email = "User not found";
          self.setState({
              errors:errors
          })
        } else if(res.data == 'User Exists'){
            var errors = self.state.errors;
            errors.password = "Password does not match";
            self.setState({
                errors:errors
            })
        }

			})
			.catch(function(error) {
				console.log(error)
			})

  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <div>
        <LoginComponent
          onSubmit={this.processLoginForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
          toSignUp={this.props.toSignUp}
          handleOpen={this.handleOpen}
        />
        <Dialog
					modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
				>
					<iframe
						src="https://docs.google.com/forms/d/e/1FAIpQLSdSYFNqF6doLkLGBI9rZmaGXo8Jgc08OhA1Np0P_wycMZkQRw/viewform?embedded=true"
						style={{height:"80vh", width:"100%"}}
						>
						Loading...
					</iframe>
				</Dialog>
      </div>
    );
  }

}
