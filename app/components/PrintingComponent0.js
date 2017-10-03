import React from 'react'

const Printing = ({data}) => (
  <div id='printable' className="printing">
    <div className='printWrapper'>

      <div className='printTitle' style={{
        textAlign: 'center',
        marginTop: '10px',
        padding: '0',
        borderBottom: '2px solid black',
        width: '100%'
      }}>

        <h1>{data.title}</h1>
      </div>

      <div className='printType' style={{
        width: '100%',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <p>{data.type}</p>
        <p>{data.location + ' on '+ (new Date(data.date)).toDateString()}</p>
        <ul>
          {data.members.map((member,index) => <li style={{listStyleType: 'none', width: '100%', textAlign: 'center'}} key={index}>{member}</li>)}
        </ul>
      </div>

      <div className='printContent'>
        <div className='printCategory'>
          <h2>Decisions</h2>
          <ul>
            {data.decisions.map((item,index) => <li key={index}>{item}</li>)}
          </ul>
        </div>

        <div className='printCategory'>
          <h2>Action Items</h2>
          <ul>
            {data.actions.map((item,index) => <li key={index}>{item.phrase}</li>)}
          </ul>
        </div>

        <div className='printCategory'>
          <h2>General Notes</h2>
          <ul>
            {data.minutes.map((item,index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>

    </div>
  </div>
)
export default Printing
