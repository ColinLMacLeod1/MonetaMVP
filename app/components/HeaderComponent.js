import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'

import nameLogo from '../assets/images/nameLogo.png'
import Login from '../containers/Login'
import Signup from '../containers/Signup'

const HeaderComponent = ({handleHome, handleActivationLogin, loginDialog, handleActivationSignup, signupDialog, errors, onChange, username, password, onClick, login}) => (
  <div>
      <div className='Header'>
      <div className='HeaderBlock'>

        <div className='HeaderHome'>
          <FlatButton primary={true} label='Home' onClick={handleHome}/>
        </div>
        <a className='HeaderLogo'><img src={nameLogo} style={{width:'20%'}} /></a>
        <div className='HeaderButtons'>
          <RaisedButton labelColor='rgb(92, 167, 255)' label='Login' onClick={handleActivationLogin}/>
          <RaisedButton style={{marginLeft:"1vw"}} labelColor='rgb(92, 167, 255)' label='Sign Up' onClick={handleActivationSignup}/>
        </div>
      </div>
    </div>

    <Dialog style={{width: '100%'}} modal={false} open={loginDialog} onRequestClose={handleActivationLogin}>
        <div className='LoginSignup'>
          <Login login={login} />
        </div>
    </Dialog>
    <Dialog modal={false} open={signupDialog} onRequestClose={handleActivationSignup}>
        <div className='LoginSignup'>
          <Signup login={login} />
        </div>
    </Dialog>
  </div>
)

export default HeaderComponent;
