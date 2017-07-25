import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const Help = ({data}) => (
  <div style={{display:'flex'}}>
    <Card style={{width:'80vw', margin:'10vh 5vw 0vh 15vw', height:'30vw'}}>
      <CardHeader
        title='Help'
        titleStyle={{fontSize:'200%'}}
        subtitle='If you have and concerns, send us some Feedback'
        subtitleStyle={{fontSize:'150%'}}
      />
      <CardActions>
        <RaisedButton label="Send Feedback" fullWidth={true} />
      </CardActions>
    </Card>
  </div>
)
export default Help
