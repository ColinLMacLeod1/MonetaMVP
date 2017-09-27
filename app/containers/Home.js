import React from 'react'
import HomeComponent from '../components/HomeComponent.js'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      signupUsername: '',
      signupPassword: '',
      signupEmail: '',
      signupCompany: '',
      errors: {},
      act: false
    }

    this.changeUser=this.changeUser.bind(this)
    this.processSignupRequest=this.processSignupRequest.bind(this)

    this.handleActivation = this.handleActivation.bind(this)

  }


  changeUser (event) {
    console.log('changeUser() (Header.js)');
    this.setState({[event.target.name]: event.target.value});
  }

  processSignupRequest () {
    console.log('processSignupRequest() (Header.js)');

    console.log('Username: ' + this.state.signupUsername);
    console.log('Password: ' + this.state.signupPassword);
    console.log('Email: ' + this.state.signupEmail);
    console.log('Company: ' + this.state.signupCompany);
  }

  handleActivation () {
    console.log('handleActivation() (Home.js)');
    if (!this.state.act) {
    this.setState({act: true});
    console.log('Open Dialog');
    } else {
    this.setState({act: false});
    console.log('Close Dialog');
  }
}




  render () {
    return (
      <div>
          <HomeComponent
            onClick={this.processSignupRequest}
            onChange={this.changeUser}
            errors={this.state.errors}
            signupUsername={this.state.signupUsername}
            signupPassword={this.state.signupPassword}
            signupEmail={this.state.signupEmail}
            signupCompany={this.state.signupCompany}
            act={this.state.act}
            handleActivation={this.handleActivation}
          />
      </div>
    )
  }
}
