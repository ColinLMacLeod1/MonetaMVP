import React from 'react';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import InputField from './InputField.js'
import CircularProgress from 'material-ui/CircularProgress'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import Dialog from 'material-ui/Dialog';

const Dictation = ({onSubmit, onChange, itemAdd, itemChange, itemDelete, helpOpen, helpClose, buttonPress, errors, toMeta, data, toFile, transcript, isRecording, help}) => (
		<Card className="dictation">

			<div className="head">
				<div className="meta">
					<h1>{data.title}</h1>
					<h2>{data.type}</h2>
					<h2>{data.location + ' on '+ data.date.toDateString()}</h2>
					<h2>{data.date.toTimeString()}</h2>
				</div>

				<div>
					<h2>Members Present:</h2>
					<ul style={{listStyle:'none'}}>
						{data.members.map((member,index) =>
							<li key={index}>{member}</li>
						)}
					</ul>
				</div>
			</div>

			<div className='Help'>
				<RaisedButton label='Help' onTouchTap={helpOpen} />
				<p style={{marginRight: '30px'}}> Hold "Alt" on your keyboard to begin recording speech </p>
			</div>

			<div className="sections">

				<Card className="section">
					<h1 style={{margin: 0}}> Team Decisions </h1>
					<p style={{margin: 0, color: 'rgb(70,153,255)'}}> Activation word: "decision, decide, decided" </p>
					<List style={{margin: 5}}>
						{data.decisions.map((item,index) =>
							<div key={index} className="listItem">
								<TextField
					        className="field-line"
					        name="decisions"
									value={item}
									onChange={(event,newValue) => itemChange(newValue,index,'decisions')}
									multiLine={true}
									rows={1}
									rowsMax={4}
									style={{width: '100%'}}
					      />
								<p className='deleteButton' onClick={(e)=> itemDelete(item, index, e,'decisions')}>x</p>
							</div>
						)}
					</List>
					<InputField	title='decisions'	submitData={(item,src) => itemAdd(item,src)}/>
				</Card>


				<Card className="section">
					<h1 style={{margin: 0}}> Action Items </h1>
					<p style={{margin: 0, color: 'rgb(70,153,255)'}}> Activation word: "action" </p>
					<List style={{margin: 5}}>
						{data.actions.map((item,index) =>
							<div key={index} className="listItem">
								<TextField
					        className="field-line"
					        name="actions"
									value={item.phrase}
									onChange={(event,newValue) => itemChange(newValue,index,'actions')}
									multiLine={true}
									rows={1}
      						rowsMax={4}
									style={{width: '100%'}}
					      />
								<p className='deleteButton' onClick={(e)=> itemDelete(item, index, e,'actions')}>x</p>
							</div>
						)}
					</List>
					<InputField title='actions'	submitData={(item,src) => itemAdd(item,src)}/>
				</Card>
				<Card className="section">
					<h1 style={{margin: 0}}> General Notes </h1>
					<p style={{margin: 0, color: 'rgb(70,153,255)'}}>Will only activate if no other category is activated</p>
					<List style={{margin: 5}}>
						{data.minutes.map((item,index) =>
							<div key={index} className="listItem">
								<TextField
					        className="field-line"
					        name="minutes"
									value={item}
									onChange={(event,newValue) => itemChange(newValue,index,'minutes')}
									multiLine={true}
									rows={1}
									rowsMax={4}
									style={{width: '100%'}}
					      />
								<p className='deleteButton' onClick={(e)=> itemDelete(item, index, e,'minutes')}>x</p>
							</div>
						)}
					</List>
					<InputField	title='minutes'	submitData={(item,src) => itemAdd(item,src)}/>
				</Card>
			</div>

			<div className="navButtons">
				<RaisedButton label="Previous" primary={true} onClick={toMeta}/>
				<div className="transcript">
					{isRecording == true &&
						<CircularProgress size={30} thickness={7} />
					}
					{transcript}
				</div>
				<RaisedButton label="Finish & Review" primary={true} onClick={toFile}/>
			</div>

			<Dialog
          modal={false}
          open={help}
					actions={<RaisedButton label="Close"  onClick={helpClose}/>}
          onRequestClose={helpClose}
					className="helpDialog"
        >
				<h1> Dictation feature: </h1>
        <p>
				 Hold down the "alt" key on your keyboard in order to start recording your speech.
				<br/>
				<br/>
				Unfortunately, due to the sensitivity of voice recognition please make sure to pronounce words clearly and at a modest pace (as if you are using a virtual assistant).
				Please visit the "Help" tab on the top right for more general information about the use of Monetta!
				</p>

				<h1> Note: </h1>
				<p>
				 You are able to enter your notes by simply typing it in the text field of your chosen category and clicking the "Enter" key on your keyboard or "Submit" next to the text field!
				<br/>
				</p>

				<br/>

				<h2 style={{color: 'rgb(255,172,77)'}}> For any issues please send us feedback by using the button on the top right of the screen!</h2>

        </Dialog>
		</Card>
	)

export default Dictation;
