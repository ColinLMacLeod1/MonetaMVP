import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const FileDisplay = ({data,toDictation,save,toEmail,toPDF,handleRequestClose, newMeeting}) => (
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
          <ListItem disabled={true} primaryText={item} key={Math.random()}/>
          )}
        </List>
      </Card>
      <Card className="section">
        <CardTitle title="Action Items"/>
        <List>
          {data.actions.map((item,index) =>
            <ListItem disabled={true} primaryText={item.phrase} key={Math.random()}/>
          )}
        </List>
      </Card>
      <Card className="section">
        <CardTitle title="General Notes"/>
        <List>
          {data.minutes.map((item,index) =>
            <ListItem disabled={true} primaryText={item} key={Math.random()}/>
          )}
        </List>
      </Card>
    </div>
    <div className="navButtons">
      <RaisedButton label="Edit" primary={true} onClick={toDictation}/>
      <FlatButton label="Email" primary={true} onClick={toEmail}/>
      <FlatButton label="Print PDF" primary={true} onClick={toPDF}/>
      <RaisedButton label="Save & Finish" primary={true} onClick={save}/>
    </div>
  </Card>
)
export default FileDisplay
