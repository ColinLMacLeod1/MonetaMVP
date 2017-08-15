import React, { PropTypes } from 'react';
import LoginForm from '../components/LoginForm.js';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processLoginForm = this.processLoginForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processLoginForm(event) {
    event.preventDefault();
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
    const self = this;
		axios.post('https://monettatech.com/login',
			{
				username: self.state.user.email,
				password: self.state.user.password
			}
			)
			.then(function(res) {
				console.log(res.data)
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
					console.log('Login Successful')
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
      <LoginForm
        onSubmit={this.processLoginForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        toSignUp={this.props.toSignUp}
      />
    );
  }

}
