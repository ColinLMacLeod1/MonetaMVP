import React from 'react';
import Link from 'react-router';
import Card from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


const LoginForm = ({onSubmit, onChange, errors, user, toSignUp, handleOpen}) => (
  <div className="loginForm">
      <h2 className="card-heading">Login</h2>

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

      <div className="button-line">
        <RaisedButton onClick={()=>onSubmit()} label="Log in" primary />
        <FlatButton label="Sign Up" onClick={handleOpen} primary={true} />
      </div>
  </div>
);

export default LoginForm;
