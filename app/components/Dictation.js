import React from 'react';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
const Dictation = ({onSubmit, onChange, errors, data}) => (
		<Card className="meeting">
			<h1>{data.title}</h1>
			<h2>{data.type}</h2>
			<h2>{data.location + ' on '+ data.date.toDateString()}</h2>
			<div className="sections">
				<div className="section">
					<CardTitle title="Minutes"/>
				</div>
				<div className="section">
					<CardTitle title="Action Items"/>
				</div>
				<div className="section">
					<CardTitle title="Decisions"/>
				</div>
			</div>
		</Card>
	)

export default Dictation;
