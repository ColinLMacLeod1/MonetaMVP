import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

const Home = ({data}) => (
  <div style={{display:'flex'}}>
    <Card style={{width:'30vw', margin:'10vh 5vw 0vh 15vw', height:'30vw'}}>
      <CardHeader
        title='New Meeting'
        titleStyle={{fontSize:'200%'}}
        subtitle='Start a new meeting'
        subtitleStyle={{fontSize:'150%'}}
      />
      <CardActions>
        <RaisedButton label="Action1" fullWidth={true} />
      </CardActions>
    </Card>
    <Card style={{width:'30vw', margin:'10vh 15vw 0vh 5vw', height:'30vw'}}>
      <CardHeader
        title='Repository'
        titleStyle={{fontSize:'200%'}}
        subtitle='Check out your old meetings'
        subtitleStyle={{fontSize:'150%'}}
      />
      <CardActions>
        <RaisedButton label="Action1" fullWidth={true} />
      </CardActions>
    </Card>
  </div>
)
export default Home
