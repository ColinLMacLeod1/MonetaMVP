import React from 'react';
import Link from 'react-router';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({onSubmit, onChange, errors, user}) => (
  <Card className="meeting">
    <CardTitle title="New Meeting" />
    <TextField
      floatingLabelText="Title"
      name="title"
      onChange={onChange}
    />
    <TextField
      floatingLabelText="Title"
      name="title"
    />
  </Card>
);

export default LoginForm;
