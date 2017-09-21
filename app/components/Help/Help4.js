import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import screen1 from '../../assets/images/screen1.png';


const Help4 = () => (
  <Card >
    <CardHeader
      title="This is where all of your past meetings are stored."
      subtitle="From here you can search, delete, print, or email any of your past meetings. You can search by member or by title between any two dates. Just enter the info and press 'enter' to search! If you want to bring up all of your meetings simple search with nothing typed in the titel field. If you don't select dates it will automatically search all time."
    />
    <Card>
      <CardMedia>
        <img src={screen1} alt="" />
      </CardMedia>
    </Card>
  </Card>
);

export default Help4;
