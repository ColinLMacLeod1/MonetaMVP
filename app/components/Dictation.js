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
					<h2>{data.location + ' on '+ data.date}</h2>
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
			<div className="transcript">
				{isRecording == true &&
					<CircularProgress size={30} thickness={7} />
	      }
				{transcript}
			</div>
			<div className="sections">
				<Card className="section">
					<CardTitle title="Decisions"/>
					<List>
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
								<p onClick={(e)=> itemDelete(item, index, e,'decisions')}>x</p>
							</div>
						)}
					</List>
					<InputField	title='decisions'	submitData={(item,src) => itemAdd(item,src)}/>
				</Card>
				<Card className="section">
					<CardTitle title="Action Items"/>
					<List>
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
								<p onClick={(e)=> itemDelete(item, index, e,'actions')}>x</p>
							</div>
						)}
					</List>
					<InputField title='actions'	submitData={(item,src) => itemAdd(item,src)}/>
				</Card>
				<Card className="section">
					<CardTitle title="General Notes"/>
					<List>
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
								<p onClick={(e)=> itemDelete(item, index, e,'minutes')}>x</p>
							</div>
						)}
					</List>
					<InputField	title='minutes'	submitData={(item,src) => itemAdd(item,src)}/>
				</Card>
			</div>

			<div className="navButtons">
				<RaisedButton label="Previous" primary={true} onClick={toMeta}/>
				<RaisedButton label="Review" primary={true} onClick={toFile}/>
			</div>

			<Dialog
          title="Help With Monetta"
          modal={false}
          open={help}
					actions={<RaisedButton label="Close"  onClick={helpClose}/>}
          onRequestClose={helpClose}
        >
          The text here will help you use Monetta. One day.
        </Dialog>
		</Card>
	)

export default Dictation;
