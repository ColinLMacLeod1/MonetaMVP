import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import nameLogo from '../assets/images/nameLogo.png'
import Dialog from 'material-ui/Dialog'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'


const HeaderComponent = ({handleHome, handleActivation, act, errors, onChange, username, password, onClick}) => (
  <div>
      <div className='Header'>
      <div className='HeaderBlock'>


        <div className='left'>
          <FlatButton primary={true} label='Home' onClick={handleHome}/>
        </div>

        <img src={nameLogo} style={{width:'20%'}} />


        <div className='right'>
          <RaisedButton labelColor='rgb(92, 167, 255)' label='Login' onClick={handleActivation}/>
        </div>

      </div>
    </div>

    <Dialog modal={false} open={act} onRequestClose={handleActivation}>

      <h1 className='DialogLogin'> Coming soon to a web browser near you! </h1>


    </Dialog>

  </div>
)

export default HeaderComponent;
