import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import logo from '../assets/images/logo2.png'
import logo2 from '../assets/images/MonettaLogo.png'



const HeaderInsideComponent = ({handlePTerms, handleHome, feedbackButton}) => (

	<div className="header" style={{width:'100%'}}>
		<div className='topBar'>
			<FlatButton label='Privacy & Terms' labelStyle={{color: 'white'}}  onClick={handlePTerms}/>
			<button className='Button' onClick={handleHome}><img src={logo2} className='Logo'/></button>
			<RaisedButton label="Send Feedback" secondary={true} onClick={feedbackButton} />
		</div>
	</div>

)

export default HeaderInsideComponent
