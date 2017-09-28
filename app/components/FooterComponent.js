import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import nameLogo from '../assets/images/nameLogo.png'


const FooterComponent = ({handlePrivacyTerms, handleContactUs, handleActivation, act}) => (
  <div className='Footer'>
    <div className='FooterBlock'>

      <div className='Logo'>
        <img className='Logo' src={nameLogo} />
      </div>

      <div className='ContactInfo'>
        <h2> Contact Us </h2>
        <p>team@monettatech.com</p>
        <p>945 Princess St., K7L3N6</p>
        <p>Kingston, ON</p>
        <p>Canada</p>
        <br></br>
      </div>

      <div className='Button'>
        <FlatButton label='Privacy & terms' primary={true} onClick={handleActivation}/>
      </div>





      <Dialog modal={false} open={act} onRequestClose={handleActivation}>
        <h1 className='DialogLogin'> Coming soon to a web browser near you! </h1>
      </Dialog>

    </div>
  </div>
)

export default FooterComponent;
