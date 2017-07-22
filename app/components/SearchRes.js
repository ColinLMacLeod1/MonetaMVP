import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

const SearchRes = (props) => (
  <div>
    <Card style={{width:'80vw', margin:'2vh 10vw 0vh 10vw'}}>
      <CardHeader
        title={props.results.title}
        subtitle={props.results.date}
      />
      <FlatButton label="Select" fullWidth={true} />
    </Card>
  </div>


);

export default SearchRes;
