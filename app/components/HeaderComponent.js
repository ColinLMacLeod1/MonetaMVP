import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import nameLogo from '../assets/images/nameLogo.png'
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Login from '../containers/Login'


const HeaderComponent = ({handleHome, handleActivation, act, errors, onChange, username, password, onClick, login}) => (
  <div>
      <div className='Header'>
      <div className='HeaderBlock'>

        <div>
          <FlatButton primary={true} label='Home' onClick={handleHome}/>
        </div>
        <a className='HeaderLogo'><img className='HeaderLogo' src={nameLogo} style={{width:'20%'}} /></a>
        <div>
          <RaisedButton labelColor='rgb(92, 167, 255)' label='Login' onClick={handleActivation}/>
        </div>

      </div>
    </div>

    <Dialog modal={false} open={act} onRequestClose={handleActivation}>
      <h1 className='DialogLogin'></h1>
        <div className='LoginSignup'>
          <Login login={login} />
        </div>
    </Dialog>
  </div>
)

export default HeaderComponent;
