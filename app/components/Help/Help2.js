import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import screen2 from '../../assets/images/screen2.png';


const Help2 = () => (
  <Card style={{padding:"1vw"}}>
    <CardHeader
      title="This is the scrren you'll see during the meeting."
      subtitle="Here you can add notes with our Speech to Text feature or by typing them in. Hold down the Alt key to record a note whenever you want. If you wish to add a note manually you can do do by typing intext field in teh category you wish to add the note to. When your meeting is done, click review to continue. "
    />
    <Card>
      <CardMedia>
        <img src={screen2} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help2;
