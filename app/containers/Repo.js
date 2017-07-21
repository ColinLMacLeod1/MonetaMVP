import React from 'react';
import _, { clone,merge } from 'lodash';
import axios from 'axios';
import MeetingForm from '../components/MeetingForm.js'
import Dictation from '../components/Dictation.js'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'


var sampleResults = {
  title: "Finalize Sgt.Peppers Lyrics",
  type: "Songwriting Meeting",
  date: new Date(),
  location:"Abbey Road",
  groups: ["tech", "Sales"],
  chair: "Litt",
  members: [
      "Paul",
      "John",
      "George",
      "Ringo"
    ]
}


export default class Meeting extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: 'colinlmacleod1',
			search: '',
      searchType: 'title'
		}
    this.onChange = this.onChange.bind(this)
    this.search = this.search.bind(this)
	}
  onChange(event,newValue){
    console.log(newValue)
    if(typeof(newValue)==='object'){
      this.setState({
        date: newValue
      })
    }
    else{
      if(event.target.name==="members"){

      }
      else{
        this.setState({
          [event.target.name]: newValue
        })
      }
    }
  }
  search() {
    console.log('search')
  }
  render() {

  	return (
      <center>
        <Card style={{width:'80%', marginTop:'2vh'}}>
        <CardHeader
          title="Search"
          subtitle="Subtitle"
        />
          <Tabs>
            <Tab label="Title">
              <TextField
                className="field-line"
                floatingLabelText="Title Search"
                name="titleSearch"
                underlineShow={true}
                fullWidth={true}
              />
            </Tab>
            <Tab label="Members">
            <TextField
              className="field-line"
              floatingLabelText="Member Search"
              name="titleSearch"
              underlineShow={true}
              fullWidth={true}
            />
            </Tab>
            <Tab label="Date">
            <TextField
              className="field-line"
              floatingLabelText="Date Search"
              name="titleSearch"
              underlineShow={true}
              fullWidth={true}
            />
            </Tab>
          </Tabs>
          <Card style={{width:'80%', marginTop:'2vh'}}>
            <CardHeader
              title={sampleResults.title}
              subtitle={sampleResults.date.toString()}
            />
            <RaisedButton label="Select" secondary={true}/>
          </Card>
          <Card style={{width:'80%', marginTop:'2vh'}}>
            <CardHeader
              title={sampleResults.title}
              subtitle={sampleResults.date.toString()}
            />
            <RaisedButton label="Select" secondary={true}/>
          </Card>
          <Card style={{width:'80%', marginTop:'2vh'}}>
            <CardHeader
              title={sampleResults.title}
              subtitle={sampleResults.date.toString()}
            />
            <RaisedButton label="Select" secondary={true}/>
          </Card>
          <Card style={{width:'80%', marginTop:'2vh'}}>
            <CardHeader
              title={sampleResults.title}
              subtitle={sampleResults.date.toString()}
            />
            <RaisedButton label="Select" secondary={true}/>
          </Card>
          <Card style={{width:'80%', marginTop:'2vh'}}>
            <CardHeader
              title={sampleResults.title}
              subtitle={sampleResults.date.toString()}
            />
            <RaisedButton label="Select" secondary={true}/>
          </Card>

        </Card>
      </center>
    )
  }
}
