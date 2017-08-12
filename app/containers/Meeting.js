import React from 'react';
import axios from 'axios';
import WatsonSpeech from 'watson-speech'
import MeetingForm from '../components/MeetingForm.js'
import Dictation from '../components/Dictation.js'
import FileReview from '../components/FileReview.js'
import Snackbar from 'material-ui/Snackbar'


export default class Meeting extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			start: false,
			stop: false,
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
				"Also a test",
        "Still Testing"
			],
			actions: [{phrase: "Action Test", assigned:["Litt"], date:"ASAP"}],
			decisions: ["Decision Test","Another one"],
      pane: 0,
      username: this.props.username,
      saved:false,
      email:false,
      transcript:'',
      isRecording:false,
      token:''
		}
    this.onChange = this.onChange.bind(this)
    this.toDictation = this.toDictation.bind(this)
    this.toMeta = this.toMeta.bind(this)
    this.toFile = this.toFile.bind(this)
    this.save = this.save.bind(this)
    this.toEmail = this.toEmail.bind(this)
    this.toPDF = this.toPDF.bind(this)
    this.createEmail = this.createEmail.bind(this)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.newMeeting = this.newMeeting.bind(this)
    this.itemAdd = this.itemAdd.bind(this)
    this.itemChange = this.itemChange.bind(this)
    this.itemDelete = this.itemDelete.bind(this)
    this.stream = this.stream.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
		this.handleKeyUp = this.handleKeyUp.bind(this)

    console.log(this.state.username)
	}
  componentDidMount() {
    	window.addEventListener("keydown", this.handleKeyDown);
    	window.addEventListener("keyup", this.handleKeyUp);
      const self = this;
      axios.get('http://localhost:8080/token')
  		.then(function (token) {
        self.setState({
          token:token.data
        })
      })
      .catch(function(error) {
        console.log(error);
      });
	}
  componentWillUnmount() {
	    window.removeEventListener("keydown", this.handleKeyDown);
	    window.removeEventListener("keyup", this.handleKeyUp);
	}
  handleKeyDown(event){
    if(event.key === 'Alt' && !this.state.isRecording){
      console.log(event)
      event.preventDefault();
      console.log('Start')
      this.stream()
      this.setState({isRecording: true});
    }
  }
  handleKeyUp(event){
    if(event.key == 'Alt' && this.state.isRecording){
      event.preventDefault();
      this.setState({isRecording: false});
      console.log('Stop')
    }
}
  onChange(event, newValue, chips){
    console.log(newValue)
    if(newValue === null){
      console.log('Called!')
      this.setState({
        members: chips
      })
    }
    else if(typeof(newValue)==='object'){
      this.setState({
        date: newValue
      })
    }
    else{
        this.setState({
          [event.target.name]: newValue
        })
    }
  }
  toDictation(){
    this.setState({
      pane: 1
    })
  }
  toMeta(){
    this.setState({
      pane: 0
    })
  }
  toFile(){
    this.setState({
      pane: 2
    })
  }
  save(){
    console.log('Saving')
    const self = this;
    console.log(self.state.username)
		axios.post('http://localhost:8080/save',
			{
				title: self.state.title,
				type: self.state.type,
				date: self.state.date.getTime(),
				location:self.state.location,
				groups: self.state.groups,
				chair: self.state.chair,
				members:self.state.members,
				minutes: self.state.minutes,
				actions: self.state.actions,
				decisions: self.state.decisions,
        username: self.state.username
			}
			)
			.then(function(res) {
				console.log(res.data)
        self.setState({
          saved:true
        })
				console.log('Saved')
			})
			.catch(function(error) {
				console.log(error)
			})

  }
  createEmail() {
	// Making all of the values variables
	var mailURI = "mailto:";
	var title = "%0A" +  this.state.title;
	var type = "%0A" +this.state.type;
	var date = "%0A" +this.state.date;
	var location = "%0A" +this.state.location + "%0A";
	var groups = "%0AGroups:%0A"
	var chair= "%0AChair: " +this.state.chair;
	var members= "%0AMembers:%0A";
	var minutes= "%0AMinutes:%0A";
	var actions= "%0AActions:%0A";
	var decisions= "%0ADecisions:%0A";
	var message = "%0A%0A%0AThis message was sent to you by Monetta, meeting minutes for the 21st century";
	var body = "";
	// Making arrays into legit strings
	for(var i=0;i<this.state.groups.length;i++) {
		groups = groups + this.state.groups[i] + "%0A";
	}
	console.log(groups)
	for(var i=0;i<this.state.members.length;i++) {
		members = members + this.state.members[i] + "%0A";
	}
	console.log(members)
	for(var i=0;i<this.state.minutes.length;i++) {
		minutes = minutes + this.state.minutes[i] + "%0A";
	}
	console.log(minutes)
	for(var i=0;i<this.state.actions.length;i++) {
		actions = actions + this.state.actions[i].phrase + " Assigned to: " + this.state.actions[i].assigned.toString() + " Due " + this.state.actions[i].date + "%0A";
	}
	console.log(actions)
	for(var i=0;i<this.state.decisions.length;i++) {
		decisions = decisions + this.state.decisions[i] + "%0A";
	}
	console.log(decisions)

	body = title + type + date + location  + groups + chair + members + minutes + actions + decisions + message;
	return  mailURI  + "?body=" + body ;
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
  }
  handleRequestClose(){
    this.setState({
      saved: false,
      email:false
    });
  }
  newMeeting(){
    this.setState({
			title: "",
			type: "",
			date: new Date(),
			location:"",
			groups: [],
			chair: "",
			members: [],
			minutes: [
				"Minute test",
				"Also a test"
			],
			actions: [{phrase: "Action Test", assigned:["Litt"], date:"ASAP"}],
			decisions: ["Decision Test"],
      pane: 0
    });
  }
  itemAdd(item, src){
    var newArray
    if(src==='decisions'){
      newArray = this.state.decisions
      newArray.push(item)
    }
    else if(src==='minutes'){
      newArray = this.state.minutes
      newArray.push(item)
    }
    else if(src==='actions'){
      newArray = this.state.actions
      var newItem = {phrase:item,assigned:'',date:''}
      newArray.push(newItem)
    }
    this.setState({
      [src]: newArray
    })
  }
  itemChange(item, index, src){
    var newArray
    if(src==='decisions'){
      newArray = this.state.decisions
      newArray[index] = item
    }
    else if(src==='minutes'){
      newArray = this.state.minutes
      newArray[index] = item
    }
    else if(src==='actions'){
      newArray = this.state.actions
      newArray[index].phrase = item
    }
    this.setState({
      [src]: newArray
    })
  }
  itemDelete(item, index, event, src){
    var newArray=[]
    if(src==='decisions')
      newArray = this.state.decisions
    else if(src==='minutes')
      newArray = this.state.minutes
    else if(src==='actions')
      newArray = this.state.actions
    newArray.splice(index,1)
		this.setState({
    	[src]: newArray
    });
	}
  stream(){
		console.log('stream')
    const self=this;

		console.log(this.state.token)
		var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
      token: this.state.token,
      objectMode: true, // send objects instead of text
      format: true, // optional - performs basic formatting on the results such as capitals an periods
			keywords: ['Action','Decision','Matt'],
			keywords_threshold: 0.

    });

    stream.on('data', function(data) {

      var text = data.results[0].alternatives[0].transcript;
      console.log(text)
      self.setState({
        transcript:data.results[0].alternatives[0].transcript
      })
			if(data.results[0].final){
        self.setState({
          transcript:''
        })
				if(text.includes('Action') || text.includes('action')){
          self.itemAdd(text,'actions')
        } else if(text.includes('Decision') || text.includes('decision')) {
          self.itemAdd(text,'decisions')
        } else {
          self.itemAdd(text, 'minutes')
        }
			}

    });

    stream.on('error', function(err) {
        console.log(err);
    });
		window.addEventListener("keyup", stream.stop.bind(stream));
    //document.querySelector('#stop').onclick = stream.stop.bind(stream);

	}
  render() {
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
      switch (this.state.pane) {
      case 0:
        return (<div>
  					<MeetingForm
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              onDelete={this.onDelete}
              memberChange={this.memberChange}
              toDictation={this.toDictation}
              errors={this.errors}
              data={data}
  					/><Snackbar
                  open={this.state.saved}
                  message="Saved"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                /></div>);
      case 1:
        return (<div>
            <Dictation
              data={data}
              toMeta={this.toMeta}
              toFile={this.toFile}
              itemAdd={this.itemAdd}
              itemChange={this.itemChange}
              itemDelete={this.itemDelete}
              transcript={this.state.transcript}
            /><Snackbar
                  open={this.state.saved}
                  message="Saved"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                /></div>);
      case 2:
        return (<div>
            <FileReview
              data={data}
              toDictation={this.toDictation}
              save={this.save}
              toPDF={this.toPDF}
              toEmail={this.toEmail}
              handleRequestClose={this.handleRequestClose}
              newMeeting={this.newMeeting}
            /><Snackbar
                  open={this.state.saved}
                  message="Saved"
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
              <Snackbar
                    open={this.state.email}
                    message="Preparing Your Email!"
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                  /></div>);

  	}
  }
}
