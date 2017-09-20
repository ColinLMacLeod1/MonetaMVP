import React from 'react';
import Link from 'react-router';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const SignUpForm = ({onSubmit, onChange, errors, user, toLogin}) => (
  <Card className="loginForm" >
      <h2 className="card-heading">Create Account</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Sign Up Code"
          name="code"
          onChange={onChange}
          errorText={errors.code}
          value={user.code}
        />
      </div>

      <div className="button-line">
        <RaisedButton onClick={()=>onSubmit()} label="Sign Up" primary />
        <FlatButton label="I Have an Account" onClick={toLogin} primary={true} />
      </div>
  </Card>
);

export default SignUpForm;
