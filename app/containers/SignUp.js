import React, { PropTypes } from 'react';
import SignUpForm from '../components/SignUpForm.js';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


export default class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processSignUpForm = this.processSignUpForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processSignUpForm(event) {
    event.preventDefault();
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);
    const self = this;
		axios.post('http://localhost:4200/signup',
			{
				username: self.state.user.email,
				password: self.state.user.password
			}
			)
			.then(function(res) {
				console.log(res.data)
        if(res.data != 'User Exists'){
          var errors = self.state.errors;
          errors.email = "";
          self.setState({
              errors:errors
          })
        }
        if(res.data != 'Sign Up Unsuccessful'){
          var errors = self.state.errors;
          errors.password = "";
          self.setState({
              errors:errors
          })
        }
				if(res.data != 'Sign Up Unsuccessful' && res.data != 'User Exists'){
					console.log('Sign Up Successful')
          self.props.login(self.state.email)
          //self.props.history.push('/home')
				} else if(res.data == 'User Exists') {
          var errors = self.state.errors;
          errors.email = "User Already Exists";
          self.setState({
              errors:errors
          })
        } else if(res.data == 'Sign Up Unsuccessful'){
            var errors = self.state.errors;
            errors.password = "Account didn't save properly";
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
      <SignUpForm
        onSubmit={this.processSignUpForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        toLogin={this.props.toLogin}
      />
    );
  }

}
