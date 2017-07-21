import React from 'react';
import Link from 'react-router';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip'
import {List, ListItem }from 'material-ui/List'

const MeetingForm = ({ onChange, onDelete, onAdd, members, toDictation, errors}) => (
  <Card className="meeting">
    <CardTitle title="New Meeting" />
      <TextField
        className="field-line"
        floatingLabelText="Title"
        name="title"
        underlineShow={false}
        onChange={onChange}
      /><Divider />
      <TextField
        className="field-line"
        floatingLabelText="Meeting Type"
        name="type"
        underlineShow={false}
        onChange={onChange}
      /><Divider />
      <TextField
        className="field-line"
        floatingLabelText="Location"
        name="location"
        underlineShow={false}
        onChange={onChange}
      /><Divider />
      <TimePicker
        className="field-line"
        hintText="Time"
        minutesStep={5}
        underlineShow={false}
        onChange={onChange}
      /><Divider />
      <TextField
        className="field-line"
        floatingLabelText="Add Members"
        name="members"
        onChange={onChange}
      />
      <RaisedButton label="Add Member" secondary={true} onClick={onAdd}/>
      {members.map((member,index) =>
        <Chip key={index} onRequestDelete={() => onDelete(index)} >
          {member}
        </Chip>
      )}
      <br/><br/>
      <RaisedButton label="Next" primary={true} onClick={toDictation}/>
  </Card>
);


export default MeetingForm;
