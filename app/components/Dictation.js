import React from 'react';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import InputField from './InputField.js'

const Dictation = ({onSubmit, onChange, itemChange, addItem, buttonPress, errors, toMeta, data, toFile}) => (
		<Card className="dictation">
			<h1>{data.title}</h1>
			<h2>{data.type}</h2>
			<h2>{data.location + ' on '+ data.date.toDateString()}</h2>
			<h2>{data.members}</h2>
			<div className="sections">
				<Card className="section">
					<CardTitle title="Decisions"/>
					<List>
						{data.decisions.map((item,index) =>
							<TextField
								key={index}
				        className="field-line"
				        name="decisions"
								defaultValue={item}
								onChange={(event,newValue) => itemChange(newValue,index,'decisions')}
				      />
						)}
					</List>
					<TextField
		        className="field-line"
		        floatingLabelText="Decision"
		        name="decisions"
		        onChange={onChange}
						onKeyPress={(ev,value) => {
							if (ev.key === 'Enter') {
								console.log(value)
								ev.preventDefault();
							}
						}}
		      />
					<RaisedButton label="Add Decision" secondary={true}/>
				</Card>
				<Card className="section">
					<CardTitle title="Action"/>
					<List>
						{data.actions.map((item,index) =>
							<TextField
								key={index}
				        className="field-line"
				        name="decisions"
								defaultValue={item.phrase}
								onChange={(event,newValue) => itemChange(newValue,index,'actions')}
				      />
						)}
					</List>
					<TextField
		        className="field-line"
		        floatingLabelText="Action Item"
		        name="actions"
		        onChange={onChange}
		      />
					<RaisedButton label="Add" secondary={true}/>
				</Card>
				<Card className="section">
					<CardTitle title="General Notes"/>
					<List>
						{data.minutes.map((item,index) =>
							<TextField
								key={index}
				        className="field-line"
				        name="decisions"
								defaultValue={item}
								onChange={(event,newValue) => itemChange(newValue,index,'minutes')}
				      />
						)}
					</List>
					<TextField
		        className="field-line"
		        floatingLabelText="Notes"
		        name="notes"
		        onChange={onChange}
		      />
					<RaisedButton label="Add" secondary={true}/>
				</Card>
			</div>
			<div className="navButtons">
				<FlatButton label="Previous" primary={true} onClick={toMeta}/>
				<FlatButton label="Finish" primary={true} onClick={toFile}/>
			</div>
		</Card>
	)

export default Dictation;
