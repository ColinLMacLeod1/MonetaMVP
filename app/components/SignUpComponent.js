import React from 'react'
import Link from 'react-router'
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const SignupComponent = ({handleLogSigActivate, handleSignupSubmit, onChange, errors, formUsername, formPassword, formCode}) => (
  <div className="loginForm" >
      <h2 className="card-heading">Create Account</h2>

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="formUsername"
          errorText={errors.email}
          onChange={onChange}
          value={formUsername}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="formPassword"
          onChange={onChange}
          errorText={errors.password}
          value={formPassword}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Sign Up Code"
          name="formCode"
          onChange={onChange}
          errorText={errors.code}
          value={formCode}
        />
      </div>

      <div className="button-line">
        <RaisedButton onClick={()=>handleSignupSubmit()} label="Sign Up" secondary={true} />
      </div>
  </div>
);

export default SignupComponent;
