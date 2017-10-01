import React from 'react';
import _, { clone,merge } from 'lodash';
import axios from 'axios';
import {List, ListItem} from 'material-ui/List';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import MeetingForm from '../components/MeetingForm.js'
import FileDisplay from '../components/FileDisplay.js'
import Snackbar from 'material-ui/Snackbar'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import DatePicker from 'material-ui/DatePicker'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import Printing from '../components/Printing.js'
import FlatButton from 'material-ui/FlatButton'

export default class Repository extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      username: this.props.username,
			search: '',
      searchType: 'title',
      results: [],
      progress: '',
      meetingRes: null,
      minDate: null,
      maxDate: null,
      start: false,
			stop: false,
			text: [],
			tasks:[],
			tInput: "",
			value:'lkjhkljh',
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
			minutes: [
				"Minute test",
				"Also a test"
			],
			actions: [{phrase: "Action Test", assigned:["Litt"], date:"ASAP"}],
			decisions: ["Decision Test"],
      email:false,
      codeRepo: 1
		}
    this.createEmail = this.createEmail.bind(this)
    this.toEmail = this.toEmail.bind(this)
    this.toPDF = this.toPDF.bind(this)
    this.loadAll = this.loadAll.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.selectResult = this.selectResult.bind(this)
    this.minDateChange = this.minDateChange.bind(this)
    this.maxDateChange = this.maxDateChange.bind(this)
    this.deleteMeeting = this.deleteMeeting.bind(this)
    this.search = this.search.bind(this)
    this.updateRefresh = this.updateRefresh.bind(this)
  }

  updateRefresh() {
    if (this.props.code == 'refresh') {
      this.loadAll();
      console.log('sucess refresh');

      this.props.handleRefresh()
    }

    console.log('CALLED');

  }


  componentDidMount(){
    this.loadAll()
    this.state = this.state || {};
    this.state.isPrinting = false;

    // Run a media query through the matchMedia API
    const query = window.matchMedia('print')
    const queryListener = function(m) {
      this.setState({isPrinting: m.matches});
    }.bind(this)

    query.addListener(queryListener);
  }




  createEmail() {
    // Making all of the values variables
    var mailURI = "mailto:";
    var title = "%0A" +  this.state.meetingRes.title;
    var type = "%0A" +this.state.meetingRes.type;
    var date = "%0A" +(new Date(this.state.meetingRes.date)).toDateString();
    var location = "%0A" +this.state.meetingRes.location + "%0A";
    var groups = "%0AGroups:%0A"
    var chair= "%0AChair: " +this.state.meetingRes.chair;
    var members= "%0AMembers:%0A";
    var minutes= "%0AMinutes:%0A";
    var actions= "%0AActions:%0A";
    var decisions= "%0ADecisions:%0A";
    var message = "%0A%0A%0AThis message was sent to you by Monetta, meeting minutes for the 21st century";
    var body = "";
    // Making arrays into legit strings
    for(var i=0;i<this.state.meetingRes.groups.length;i++) {
      groups = groups + this.state.meetingRes.groups[i] + "%0A";
    }
    console.log(groups)
    for(var i=0;i<this.state.meetingRes.members.length;i++) {
      members = members + this.state.meetingRes.members[i] + "%0A";
    }
    console.log(members)
    for(var i=0;i<this.state.meetingRes.minutes.length;i++) {
      minutes = minutes + this.state.meetingRes.minutes[i] + "%0A";
    }
    console.log(minutes)
    for(var i=0;i<this.state.meetingRes.actions.length;i++) {
      actions = actions + this.state.meetingRes.actions[i].phrase + " Assigned to: " + this.state.meetingRes.actions[i].assigned.toString() + " Due " + this.state.meetingRes.actions[i].date + "%0A";
    }
    console.log(actions)
    for(var i=0;i<this.state.meetingRes.decisions.length;i++) {
      decisions = decisions + this.state.meetingRes.decisions[i] + "%0A";
    }
    console.log(decisions)

    body = title + type + date + location  + groups + chair + members + minutes + actions + decisions + message;
    return  mailURI  + "?body=" + body ;``
  }
  toEmail(){
    this.setState({
      email:true
    })
    var test = this.createEmail();
    location.href = test;
    console.log(test)
  }
  toPDF(){
    console.log('to PDF')
    var content = document.getElementById("printable");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    console.log(content)
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    console.log('printed')
  }
  loadAll(){
    const self = this;
      self.setState({
        progress: 'loading'
      });
  		axios.post('https://monettatech.com/search',
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
              results: [],
              meetingRes:null
            })
          } else{
            self.setState({
              results:res.data.reverse(),
              progress:'edit'
            });
          }
  				console.log('Search Loaded')
          console.log(res.data)
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
  onTabChange(e,value) {
    console.log(value)
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
    axios.post('https://monettatech.com/delete',
      {
        id:self.state.meetingRes._id
      }).then(function(res){
        self.setState({
          meetingRes: null
        })
        self.loadAll()
        console.log(res)
      }).catch(function(err){
        console.log(err)
      })
  }
  search(searchType) {
    console.log('search')
    const self = this;
      self.setState({
        progress: 'loading',
        meetingRes: null,
        results: []
      });
    var minDate = this.state.minDate ? new Date(this.state.minDate).getTime() : 0;
    var maxDate = this.state.maxDate ? new Date(this.state.maxDate).getTime() : 2147483647000;
  		axios.post('https://monettatech.com/search',
  			{
  				search:self.state.search,
          searchType:searchType,
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
              results:[]
            })
          } else{
            self.setState({
              results:res.data.reverse(),
              progress:'done'
            });
          }
  				console.log('Search Complete')
  			})
  			.catch(function(error) {
  				console.log(error)
  			})

      console.log('Searched')
  }
  render(){
    var data={
      title: this.state.title,
      type: this.state.type,
      date: this.state.date,
      location: this.state.location,
      members: this.state.members,
      minutes: this.state.minutes,
      actions: this.state.actions,
      decisions: this.state.decisions
    }

    let sidebar = null;
    let container = null;
    let searchTitle = null;
    //Define SIDEBAR CONTENT
    if(this.state.results !== [] && Array.isArray(this.state.results)) {
      console.log('PRINTING RESULTS')
      console.log(this.state.meetingRes)
        sidebar = (
        <List className="meetingList">

          {this.state.results.map((result,index) =>
            <ListItem
              primaryText={result.title}
              secondaryText={(new Date(result.date)).toDateString()}
              onClick={()=>this.selectResult(index)}
              key={index}/>
          )}
        </List>
      )}
    else
      sidebar = (
        <List className="meetingList">
            <ListItem
              primaryText={'No Items Found.'}
              key={Math.random()}
            />
        </List>
      )
    //Define CONTIAINER CONTENT
    var Undefined
    if(this.state.meetingRes != null && this.state.meetingRes != Undefined)
      {console.log('PRINTING Selection')
      console.log(this.state.meetingRes)
      container = (
        <div className="displayContainer">
          <FileDisplay
          data={this.state.meetingRes}
          toEmail={this.toEmail}
          toPDF={this.toPDF}
          deleteMeeting={this.deleteMeeting}
          />
          <Printing data={this.state.meetingRes}/>
        </div>
      );}
    else
      container= (<div className="displayContainer"><h5>Nothing Selected.</h5></div>)
    //Define search title
    if(this.state.searchType == 'title')
      searchTitle = 'Title Search'
    else
      searchTitle = 'Member Search'

    this.updateRefresh();

    return(
      <div>
        <div className='searchC'>
          <div className='searchCriteria'>
            <RadioButtonGroup name="searchType" defaultSelected="title" onChange={this.onTabChange}>
              <RadioButton
                value="title"
                label="Title"
              />
              <RadioButton
                value="member"
                label="Member"
              />
            </RadioButtonGroup>
            <div className="dateDiv">
              <DatePicker
                hintText="After this date"
                value={this.state.minDate}
                onChange={this.minDateChange}
              />
              <p>to</p>
              <DatePicker
                hintText="Before this date"
                value={this.state.maxDate}
                onChange={this.maxDateChange}
              />
            </div>
            <FlatButton
              label="Refresh"
              primary={true}
              onClick={() => this.loadAll()}
            />
          </div>
          <div className="titleSearch">
            <TextField
              floatingLabelText={searchTitle}
              name="titleSearch"
              underlineShow={true}
              fullWidth={true}
              value = {this.state.search}
              onChange = {this.handleChange}
              onKeyPress={(e) => {
                if(e.key==='Enter'){
                  this.search(this.state.searchType);
                }
              }}
            />
          </div>
        </div>
        <div className="repository">
          {sidebar}
          {container}
        </div>


      </div>
    )
  }
}
