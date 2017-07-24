import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

const FileDisplay = ({data}) => (
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
            <ListItem primaryText={item} key={Math.random()}/>
          )}
        </List>
      </Card>
      <Card className="section">
        <CardTitle title="Action Items"/>
        <List>
          {data.actions.map((item,index) =>
            <ListItem primaryText={item.phrase} key={Math.random()}/>
          )}
        </List>
      </Card>
      <Card className="section">
        <CardTitle title="General Notes"/>
        <List>
          {data.minutes.map((item,index) =>
            <ListItem primaryText={item} key={Math.random()}/>
          )}
        </List>
      </Card>
    </div>
  </Card>
)
export default FileDisplay
