import React from 'react'

const Printing = ({data}) => (
  <div id='printable' className="printing">
    <h1>{data.title}</h1>
    <h2>{data.type}</h2>
    <h3>{data.location + ' on '+ (new Date(data.date)).toDateString()}</h3>
    <h4>Members Present:</h4>
    <ul>
      {data.members.map((member,index) =>
        <li key={index}>{member}</li>
      )}
    </ul>
    <h3>Decisions</h3>
    <ul>
      {data.decisions.map((item,index) =>
        <li key={index}>{item}</li>
      )}
    </ul>
    <h3>Action Items</h3>
    <ul>
      {data.actions.map((item,index) =>
        <li key={index}>{item.phrase}</li>
      )}
    </ul>
    <h3>General Notes</h3>
    <ul>
      {data.minutes.map((item,index) =>
        <li key={index}>{item}</li>
      )}
    </ul>
  </div>
)
export default Printing
