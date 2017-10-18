import React from 'react'
import _, { clone,merge } from 'lodash'
import axios from 'axios'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'
import {Tabs, Tab} from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import DatePicker from 'material-ui/DatePicker'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import FlatButton from 'material-ui/FlatButton'

import FileDisplayComponent from '../components/FileDisplayComponent.js'
import PrintingComponent from '../components/PrintingComponent.js'

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
    this.handleSearch = this.handleSearch.bind(this)
    this.updateRefresh = this.updateRefresh.bind(this)
  }

  updateRefresh() {
    if (this.props.code == 'refresh') {
      this.loadAll();
      this.props.handleRefresh()
    }
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
    for(var i=0;i<this.state.meetingRes.members.length;i++) {
      members = members + this.state.meetingRes.members[i] + "%0A";
    }
    for(var i=0;i<this.state.meetingRes.minutes.length;i++) {
      minutes = minutes + this.state.meetingRes.minutes[i] + "%0A";
    }
    for(var i=0;i<this.state.meetingRes.actions.length;i++) {
      actions = actions + this.state.meetingRes.actions[i].phrase + " Assigned to: " + this.state.meetingRes.actions[i].assigned.toString() + " Due " + this.state.meetingRes.actions[i].date + "%0A";
    }
    for(var i=0;i<this.state.meetingRes.decisions.length;i++) {
      decisions = decisions + this.state.meetingRes.decisions[i] + "%0A";
    }
    body = '<h1> "Hello" </h1>';
    return  mailURI  + "?body=" + body ;``
  }
  toEmail(){
    this.setState({
      email:true
    })
    var test = this.createEmail();
    location.href = test;
  }
  toPDF(){
    var content = document.getElementById("printable");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
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
  			})
  			.catch(function(error) {
  				console.log(error)
  			})

  }
  handleChange(e){
    this.setState({
      search: e.target.value
    });
  }
  handleKeyPress(e){
    if(e.key==='Enter'){
      this.search();
    }
  }
  onTabChange(e,value) {
    this.setState({
      searchType: value
    });

  }
  selectResult(rank) {
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
      }).catch(function(err){
        console.log(err)
      })
  }
  handleSearch() {
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
          searchType:this.state.searchType,
          username:self.state.username,
          minDate:minDate,
          maxDate:maxDate
  			}
  			)
  			.then(function(res) {
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
  			})
  			.catch(function(error) {
  				console.log(error)
  			})
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
    if(this.state.meetingRes != null && this.state.meetingRes != Undefined) {
      container = (
        <div className="displayContainer">
          <FileDisplayComponent
          data={this.state.meetingRes}
          toEmail={this.toEmail}
          toPDF={this.toPDF}
          deleteMeeting={this.deleteMeeting}
          />
          <PrintingComponent data={this.state.meetingRes}/>
        </div>
      )}
    else
      {container= (<div className="displayContainer"><h5>Nothing Selected.</h5></div>)}
    //Define search title
    if(this.state.searchType == 'title')
      searchTitle = 'Title Search'
    else
      searchTitle = 'Member Search'

    this.updateRefresh();

    return(
      <div className="Repository">

        <div className="SearchBar">
          <div className="TitleMemberRadio">
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
          </div>

          <div className="SearchParam">
            <TextField
              style={{margin: '0px 30px'}}
              floatingLabelText={searchTitle}
              name="titleSearch"
              underlineShow={true}
              fullWidth={true}
              value = {this.state.search}
              onChange = {this.handleChange}
              onKeyPress={(e) => {
                if(e.key==='Enter'){
                  this.handleSearch(this.state.searchType);
              }}}/>
              <div className="SearchDate">
                <DatePicker
                  textFieldStyle={{width: '85px', margin: '0px 30px'}}
                  hintText="After"
                  value={this.state.minDate}
                  onChange={this.minDateChange}
                />

                <p>to</p>

                <DatePicker
                  textFieldStyle={{width: '85px', margin: '0px 30px'}}
                  hintText="Before"
                  value={this.state.maxDate}
                  onChange={this.maxDateChange}
                />
              </div>
            </div>

            <div className="ActionButtons">
              <RaisedButton
                label="Search"
                primary={true}
                onClick={this.handleSearch}
              />

              <RaisedButton
                label="Refresh"
                secondary={true}
                onClick={this.loadAll}
              />

            </div>
        </div>


        <div className="ContentDisplay">
          {sidebar}
          {container}
        </div>


      </div>
    )
  }
}
