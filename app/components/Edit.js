import React from 'react';
import _, { clone,merge } from 'lodash';

export default class Edit extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			minutes:this.props.members
		}
	}
	render() {
		return (
			<div className = "fileDisplay">
					<div className="infoContainer">
						<div className="metaData">
							<input
							  	className = "title"
								name="title"
								type="text"
								placeholder="Title"
								value={this.props.title}
								onChange={this.props.handleInputChange}
							 />
							 <br />
							 {this.props.type != null &&
							 <input
		 					  	className = "type"
		 						name="type"
		 						type="text"
		 						placeholder="Meeting Type"
		 						value={this.props.type}
		 						onChange={this.props.handleInputChange}
		 					 />
		 					}
		 					<br />
							 <input
		 					  	className = "date"
		 						name="date"
		 						type="text"
		 						placeholder="Date"
		 						value={this.props.date}
		 						onChange={this.props.handleInputChange}
		 					 />
		 					 <br />
		 					{this.props.chair != null &&
		 					<div>
			 					<h3 className="chair">Chair: </h3>
								<input
			 					  className = "chair"
			 						name="chair"
			 						type="text"
			 						placeholder="Chair"
			 						value={this.props.chair}
			 						onChange={this.props.handleInputChange}
			 					 />
			 				</div>
		 					}
						</div>
						<div className="people">
					      <h3>Attendees:{this.props.members.map((member, rank) =>
					          <li key={rank}><input type ="text" name='members' value={member} onChange={(e) => this.props.handleMemberChange(rank,e)} /></li>
					      )}</h3>
						</div>
					</div>
				  <div className="contentContainer">
						<div className="minuteItems">
							<h4>Minutes</h4>
							{this.props.minutes.map((item,rank) =><li key={rank+10}><input type ="text" name='minutes' value={item} onChange={(e) => this.props.handleMinuteChange(rank,e)} /></li>)}
						</div>
						<div className="actionItems">
				      <h4>Action Items</h4>
				      {this.props.actions.map((item,rank) =><li key={rank+20}>{item.phrase}, Assigned: {item.assigned}, Due: {item.date}</li>)}
						</div>
						<div className="decisionItems">
							<h4>Decisions</h4>
							{this.props.decisions.map((item,rank) =><li key={rank+30}>{item}</li>)}
						</div>
			    	</div>
		  	</div>
	  )
}
}
