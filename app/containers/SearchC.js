import React from 'react';
import _, { clone,merge } from 'lodash';
import axios from 'axios';
import MeetingForm from '../components/MeetingForm.js'
import Dictation from '../components/Dictation.js'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import SearchRes from '../components/SearchRes'
import CircularProgress from 'material-ui/CircularProgress'
import Repository from './Repository'
import DatePicker from 'material-ui/DatePicker'


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
    ],
  username: 'colinlmacleod1'

}


export default class SearchC extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: props.username,
			search: '',
      searchType: 'title',
      results: [],
      progress: '',
      meetingRes: null,
      minDate: null,
      maxDate: null
		}
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.search = this.search.bind(this)
    this.selectResult = this.selectResult.bind(this)
    this.minDateChange = this.minDateChange.bind(this)
    this.maxDateChange = this.maxDateChange.bind(this)
    this.deleteMeeting = this.deleteMeeting.bind(this)
	}
  componentDidMount(){
    const self = this;
      self.setState({
        progress: 'loading'
      });
  		axios.post('http://localhost:4200/search',
  			{
  				search:'',
          searchType:'title',
          username:this.state.username,
          minDate:0,
          maxDate:2147483647000
  			}
  			)
  			.then(function(res) {
  				console.log(res.data)
          if(res.data.length==0){
            self.setState({
              progress:'noResult',
              meetingRes:null
            })
          } else{
            self.setState({
              results:res.data,
              progress:'edit'
            });
            self.selectResult(0);
          }
  				console.log('Search Loaded')
  			})
  			.catch(function(error) {
  				console.log(error)
  			})
  }
  handleChange(e){
    this.setState({
      search: e.target.value
    });
    console.log(this.state.search)
  }
  handleKeyPress(e){
    if(e.key==='Enter'){
      this.search();
    }
  }
  onTabChange(value) {
    this.setState({
      searchType: value
    });

  }
  selectResult(rank) {
    console.log(rank)
    this.setState({
      meetingRes:this.state.results[rank]
    });
  }
  minDateChange(e,date) {
    this.setState({
      minDate: date
    })
  }
  maxDateChange(e,date) {
    this.setState({
      maxDate: date
    })
  }
  deleteMeeting() {
    const self = this;
    axios.post('http://localhost:4200/delete',
      {
        id:self.state.meetingRes._id
      }).then(function(res){
        console.log(res)
      }).catch(function(err){
        console.log(err)
      })
  }
  search() {
    console.log('search')
    const self = this;
      self.setState({
        progress: 'loading'
      });
    var minDate = ((this.state.minDate) ? new Date(this.state.minDate).getTime() : 0);
    var maxDate = ((this.state.maxDate) ? new Date(this.state.maxDate).getTime() : 2147483647000);
  		axios.post('http://localhost:4200/search',
  			{
  				search:self.state.search,
          searchType:self.state.searchType,
          username:self.state.username,
          minDate:minDate,
          maxDate:maxDate
  			}
  			)
  			.then(function(res) {
  				console.log(res.data)
          if(res.data.length==0){
            self.setState({
              progress:'noResult',
              results:[{title:'No Results', date:(new Date()).toDateString()}]
            })
          } else{
            self.setState({
              results:res.data,
              progress:'done'
            });
            self.selectResult(0)
          }
  				console.log('Search Complete')
  			})
  			.catch(function(error) {
  				console.log(error)
  			})
  		this.setState({
  			search: ''
  		});
      console.log('Searched')
  }

  render() {




  	return (
      <div>
        <Card className="searchC">
        <CardHeader
          title="Search"
          subtitle=""
        />
          <Tabs
            value={this.state.searchType}
            onChange={this.onTabChange}
            >
            <Tab label="Title" value="title">
              <div className="dateDiv">
                <DatePicker
                  hintText="After this date"
                  value={this.state.minDate}
                  onChange={this.minDateChange}
                />
                <DatePicker
                  hintText="Before this date"
                  value={this.state.maxDate}
                  onChange={this.maxDateChange}
                />
              </div>
              <TextField
                className="field-line"
                floatingLabelText="Title Search"
                name="titleSearch"
                underlineShow={true}
                fullWidth={true}
                value = {this.state.search}
                onChange = {this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
            </Tab>
            <Tab label="Members" value="members">
            <div className="dateDiv">
              <DatePicker
                hintText="After this date"
                value={this.state.minDate}
                onChange={this.minDateChange}
              />
              <DatePicker
                hintText="Before this date"
                value={this.state.maxDate}
                onChange={this.maxDateChange}
              />
            </div>
            <TextField
              floatingLabelText="Member Search"
              name="memberSearch"
              underlineShow={true}
              fullWidth={true}
              value = {this.state.search}
              onChange = {this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            </Tab>
          </Tabs>
        </Card>
        <Repository
          meetingRes={this.state.meetingRes}
          results={this.state.results}
          selectResult={this.selectResult}
          deleteMeeting={this.deleteMeeting} />
      </div>
    )
  }
}
