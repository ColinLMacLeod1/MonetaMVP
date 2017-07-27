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
			<h1>{data.title}</h1>
			<h2>{data.type}</h2>
			<h2>{data.location + ' on '+ data.date.toDateString()}</h2>
			<h2>{data.members}</h2>
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
								<p onClick={(e)=> itemDelete(item, index, e,'decisions')}>(-)</p>
							</div>
						)}
					</List>
					<InputField
						title='decisions'
						submitData={(item,src) => itemAdd(item,src)}
					/>
				</Card>
				<Card className="section">
					<CardTitle title="Action"/>
					<List>
						{data.actions.map((item,index) =>
							<div key={index} className="listItem">
								<TextField
					        className="field-line"
					        name="actions"
									value={item}
									onChange={(event,newValue) => itemChange(newValue,index,'decisions')}
					      />
								<p onClick={(e)=> itemDelete(item, index, e,'action')}>(-)</p>
							</div>
						)}
					</List>
					<InputField
						title='actions'
						submitData={(item,src) => itemAdd(item,src)}
					/>
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
									onChange={(event,newValue) => itemChange(newValue,index,'decisions')}
					      />
								<p onClick={(e)=> itemDelete(item, index, e,'minutes')}>(-)</p>
							</div>
						)}
					</List>
					<InputField
						title='minutes'
						submitData={(item,src) => itemAdd(item,src)}
					/>
				</Card>
			</div>
			<div className="navButtons">
				<FlatButton label="Previous" primary={true} onClick={toMeta}/>
				<FlatButton label="Finish" primary={true} onClick={toFile}/>
			</div>
		</Card>
	)

export default Dictation;
