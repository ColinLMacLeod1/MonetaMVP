import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import screen1 from '../../assets/images/screen1.png';


const Help4 = () => (
  <Card >
    <CardHeader
      title="First, create your meeting"
      subtitle="Here is where you can put in all of the inital info for your meeting"
    />
    <Card>
      <CardMedia>
        <img src={screen1} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help4;
