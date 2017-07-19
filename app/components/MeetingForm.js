import React from 'react';
import Link from 'react-router';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';

const MeetingForm = ({onSubmit, onChange, errors, user}) => (
  <Card className="meeting">
    <CardTitle title="New Meeting" />
    <div>
      <TextField
        className="field-line"
        floatingLabelText="Title"
        name="title"
        onChange={onChange}
      />
    </div>
    <div>
      <TextField
        className="field-line"
        floatingLabelText="Meeting Type"
        name="type"
        onChange={onChange}
      />
    </div>
    <div>
      <TextField
        className="field-line"
        floatingLabelText="Location"
        name="location"
        onChange={onChange}
      />
    </div>
    <div>
      <TimePicker
        className="field-line"
        hintText="Time"
        minutesStep={5}
        onChange={onChange}
      />
    </div>
    <div>
      <RaisedButton label="Next" primary={true} onClick={onSubmit}/>
    </div>
  </Card>
);

export default MeetingForm;
