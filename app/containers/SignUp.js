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
				if(res.data != 'Sign Up Unsuccessful'){
					console.log('Sign Up Successful')
          this.props.login(this.state.email)
          //self.props.history.push('/home')
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
      />
    );
  }

}
