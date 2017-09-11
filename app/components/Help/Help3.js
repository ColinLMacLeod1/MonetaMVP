import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import screen3 from '../../assets/images/screen3.png';


const Help3 = () => (
  <Card style={{padding:"1vw"}}>
    <CardHeader
      title="First, create your meeting"
      subtitle="The review page will show you the finalized version of your notes. If you would like to edit your notes you can click the 'Edit' button to go back to the previous page. You can save the meeting, export it as a PDF and email it using the respective buttons."
    />
    <Card>
      <CardMedia>
        <img src={screen3} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help3;
