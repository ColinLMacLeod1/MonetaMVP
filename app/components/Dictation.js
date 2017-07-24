import React from 'react';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


const Dictation = ({onSubmit, onChange, buttonPress, errors, toMeta, data}) => (
		<Card className="dictation">
			<h1>{data.title}</h1>
			<h2>{data.type}</h2>
			<h2>{data.location + ' on '+ data.date.toDateString()}</h2>
			<h2>{data.members}</h2>
			<div className="sections">
				<Card className="section">
					<CardTitle title="Decisions"/>
					<TextField
		        className="field-line"
		        floatingLabelText="Decision"
		        name="decisions"
		        onChange={onChange}
		      />
					<RaisedButton label="Add Decision" secondary={true}/>
				</Card>
				<Card className="section">
					<CardTitle title="Action"/>
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
							<ListItem primaryText={item}/>
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
				<FlatButton label="Finish" primary={true}/>
			</div>
		</Card>
	)

export default Dictation;
