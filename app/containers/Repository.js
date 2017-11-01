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
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

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
      codeRepo: 1,
      recipients: [],
      recipientsOpen: false,
      snackOpen: false
		}

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
    this.handleRecipientsAct = this.handleRecipientsAct.bind(this)
    this.changeText = this.changeText.bind(this)
    this.itemAdd = this.itemAdd.bind(this)
    this.itemChange = this.itemChange.bind(this)
    this.itemDelete = this.itemDelete.bind(this)


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

  toEmail() {
    const self = this
    var data = self.state.meetingRes
    console.log(self.state.meetingRes)
    axios.post('/emailMonettaMinutes',{
      title: data.title,
  		type: data.type,
  		location: data.location,
  		date: data.date,
  		members: data.members,
  		decisions: data.decisions,
  		actions: data.actions,
  		minutes: data.minutes,
      recipients: self.state.recipients
    }).then(function(result){
      console.log(result)
      self.setState({recipientsTemp: '', recipients: [], snackOpen: true})
      self.handleRecipientsAct()
    }).catch(function(err){
      console.log(err)
    })
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
  		axios.post('http://localhost:3000/search',
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
    axios.post('http://localhost:3000/delete',
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
  		axios.post('http://localhost:3000/search',
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

  handleRecipientsAct () {
    this.setState({recipientsOpen: !this.state.recipientsOpen})
  }

  itemAdd(){
    var newArray = this.state.recipients
    newArray.unshift(this.state.recipientsTemp)
    this.setState({recipients: newArray, recipientsTemp: ''})
  }

  itemChange(item, index){
    var newArray = this.state.recipients
    newArray[index] = item
    this.setState({recipients: newArray})
  }

  itemDelete(index){
    var newArray = this.state.recipients
    newArray.splice(index,1)
		this.setState({recipients: newArray});
	}

  changeText (e) {
    this.setState({recipientsTemp: e.target.value});
    console.log(this.state.recipientsTemp)
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
          toEmail={this.handleRecipientsAct}
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

        <div className='EmailDialog'>
          <Dialog modal={false} open={this.state.recipientsOpen} onRequestClose={this.handleRecipientsAct}>
            <h1> Please enter recipient emails</h1>
            <div className='inputField'>
  						<TextField
  							floatingLabelText='Emails (hit "Enter" to add an email)'
  							name='recipientsTemp'
  							multiLine={true}
  							value={this.state.recipientsTemp}
  							style={{width: '100%'}}
  							onChange={this.changeText}
  							onKeyPress={(ev) => {
  								if (ev.key === 'Enter') {
  									ev.preventDefault();
  									this.itemAdd();
  								}}}
  						/>
  					</div>
            <List>
              {this.state.recipients.map((item, index) =>
                <div key={index} className='recipientEmail' style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}>
                  <TextField
                    name='recipients'
                    value={item}
                    onChange={(event,newValue) => this.itemChange(newValue, index)}
                    style={{width: '60%'}}
                    />
                  <p onClick={(e) => this.itemDelete(index)}>x</p>
                </div>
              )}
            </List>
            <div>
              <RaisedButton label='Send Email' onClick={this.toEmail} primary={true}/>
            </div>
          </Dialog>
        </div>
        <Snackbar
          open={this.state.snackOpen}
          message={'Email Sent!'}
          autoHideDuration={4000}
          onRequestClose={()=> this.setState({snackOpen: false})}
          contentStyle={{display: 'flex', justifyContent: 'center'}}
          />


      </div>
    )
  }
}
