import React from 'react'
import Link from 'react-router'
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const LoginComponent = ({handleLoginSubmit, onChange, errors, formUsername, formPassword}) => (
  <div className="loginForm">
      <h2 className="card-heading">Login</h2>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="formUsername"
          errorText={errors.username}
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
          onKeyPress= {(ev) => {
            if (ev.key == 'Enter') {
              ev.preventDefault();
              handleLoginSubmit();
            }
          }}
        />
      </div>

      <div className="button-line">
        <RaisedButton onClick={()=>handleLoginSubmit()} label="Log in" primary />
      </div>
  </div>
);

export default LoginComponent;
