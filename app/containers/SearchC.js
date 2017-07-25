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
  username: 'colinlmacleod1',
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
      meetingRes: null
		}
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.search = this.search.bind(this)
    this.selectResult = this.selectResult.bind(this)
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
          username:this.state.username
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
  search() {
    console.log('search')
    const self = this;
      self.setState({
        progress: 'loading'
      });
  		axios.post('http://localhost:4200/search',
  			{
  				search:this.state.search,
          searchType:this.state.searchType,
          username:this.state.username
  			}
  			)
  			.then(function(res) {
  				console.log(res.data)
          if(res.data.length==0){
            self.setState({
              progress:'noResult'
            })
          } else{
            self.setState({
              results:res.data,
              progress:'done'
            });
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


    var page = null;
    if(this.state.meetingRes && this.state.results !== []){
        page = (<div>
                  <Repository
                    meetingRes={this.state.meetingRes}
                    results={this.state.results}
                    selectResult={this.selectResult} />
                </div>);
      } else {
        page = <CircularProgress size={60} thickness={7} />
      }

  	return (
      <div>
        <Card style={{width:'80vw', margin:'2vh 10vw 0vh 10vw'}}>
        <CardHeader
          title="Search"
          subtitle=""
        />
          <Tabs
            value={this.state.searchType}
            onChange={this.onTabChange}
            >
            <Tab label="Title" value="title">
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
            <TextField
              className="field-line"
              floatingLabelText="Member Search"
              name="titleSearch"
              underlineShow={true}
              fullWidth={true}
              value = {this.state.search}
              onChange = {this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            </Tab>
            <Tab label="Date" value="date">
            <TextField
              className="field-line"
              floatingLabelText="Date Search"
              name="titleSearch"
              underlineShow={true}
              fullWidth={true}
              value = {this.state.search}
              onChange = {this.handleChange}
              onKeyPress={this.handleKeyPress}
            />
            </Tab>
          </Tabs>
        </Card>
        {page}
      </div>
    )
  }
}
