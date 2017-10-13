import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

import nameLogo from '../assets/images/nameLogo.png'

const HeaderComponent = ({handleLogSigActivate}) => (
  <div>
    <div className='Header'>
      <div className='HeaderBlock'>

        <div className='HeaderHome'>
          <FlatButton primary={true} label='Home' />
        </div>
        <a className='HeaderLogo'><img src={nameLogo} style={{width:'20%'}} /></a>
        <div className='HeaderButtons'>
          <RaisedButton labelColor='rgb(92, 167, 255)' label='Login' value='login' onClick={() => handleLogSigActivate('login')}/>
          <RaisedButton style={{marginLeft:"1vw"}} labelColor='rgb(92, 167, 255)' label='Sign Up' onClick={() => handleLogSigActivate('signup')}/>
        </div>
      </div>
    </div>
  </div>
)

export default HeaderComponent;
