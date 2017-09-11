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
      subtitle="Here is where you can put in all of the inital info for your meeting. When you're done you can click Start to start your meeting"
    />
    <Card>
      <CardMedia>
        <img src={screen3} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help3;
