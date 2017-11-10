import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import MicrophoneImage from '../assets/images/microphone.png'
import DictationExample from '../assets/images/DictationExample.png'
import BottomDivider from '../assets/images/dividerbottom.svg'
import TopDivider from '../assets/images/dividertop.svg'


const HomeComponent = ({handleAlphaActivation, alphaActivation}) => (
  <div className="LandingPage">

    <div className='block1wrapper'>
      <div className='block1'>
        <div className='block1content' style={{marginTop: '80px'}}>

          <div>
            <h1> Meetings by the minute. </h1>
            <p> Monetta helps your team keep track of everything happening in your meetings in the easiest way possible - by letting you use your voice to take notes. </p>
            <div style={{marginTop: '50px', marginLeft: '40px'}}>
              <input type='text' name='username' className='block1inputtxt'/>
              <input type='button' value='Get started for free' className='block1inputsubmit' />
            </div>
          </div>

          <div style={{height: '370px', marginBottom: '50px', position: 'relative', top: '140px', right: '40px'}}>
            <img src={MicrophoneImage}  height='70%' />
          </div>


        </div>
      </div>

    </div>
    <img src={BottomDivider} style={{width: '100%', display: 'flex'}}/>

    <div className='block2wrapper'>
      <div className='block2'>
        <div className='block2content'>

          <img src={DictationExample} style={{marginLeft: '40px', marginBottom: '40px', height: '1000px'}}/>
          <div>
            <h2 style={{position: 'relative', top: '350px', right: '30px'}}> Tell Monetta what you want written down during your meeting and Monetta will create and organize the meeting minutes for you </h2>
          </div>


        </div>
      </div>
    </div>
    <img src={TopDivider} style={{width: '100%', display: 'flex'}} />

    <div className='block3wrapper'>
      <div className='block3'>
        <div className='block3content'>



        </div>
      </div>
    </div>
    <img src={BottomDivider} style={{width: '100%', display: 'flex'}}/>


  </div>
)

export default HomeComponent;
