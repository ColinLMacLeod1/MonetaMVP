import React from 'react';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import InputField from './InputField.js'

const Dictation = ({onSubmit, onChange, itemAdd, itemChange, itemDelete, buttonPress, errors, toMeta, data, toFile}) => (
		<Card className="dictation">
			<div className="head">
				<div style={{marginRight:'50px'}}>
					<h1>{data.title}</h1>
					<h2>{data.type}</h2>
					<h2>{data.location + ' on '+ data.date}</h2>
				</div>
				<div>
					<h2>Members Present:</h2>
					<ul>
						{data.members.map((member,index) =>
							<li key={index}>{member}</li>
						)}
					</ul>
				</div>
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
					      />
								<p onClick={(e)=> itemDelete(item, index, e,'decisions')}>x</p>
							</div>
						)}
					</List>
					<InputField	title='decisions'	submitData={(item,src) => itemAdd(item,src)}/>
				</Card>
				<Card className="section">
					<CardTitle title="Action"/>
					<List>
						{data.actions.map((item,index) =>
							<div key={index} className="listItem">
								<TextField
					        className="field-line"
					        name="actions"
									value={item.phrase}
									onChange={(event,newValue) => itemChange(newValue,index,'actions')}
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
				<RaisedButton label="Finish" primary={true} onClick={toFile}/>
			</div>
		</Card>
	)

export default Dictation;
