import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

import ScrollAlarm from '../assets/images/ScrollAlarm.png'
import DictationFeature from '../assets/images/DictationFeature.png'
import RepositoryFeature from '../assets/images/SecureRepoFeature.png'
import DataFeature from '../assets/images/DataFeature.png'
import Illustration from '../assets/images/WhyAreYouLookingHere.jpg'




const HomeComponent = ({onClick, onChange, handleActivation, act, signupEmail, signupPassword, signupUsername, signupCompany, errors}) => (
  <div>



    <div className='HomeTop'>



      <div className='HomeTopWrapper'>

        <div className='Top'>
          <h1 className='Heading'> Make your meetings as memorable as they should be </h1>
          <p className='Snippet'> A new way to capture everything that matters </p>
          <RaisedButton className='SignupButton' label='Join our Alpha' labelColor='rgb(255,172,77)' onClick={handleActivation}/>
          <img className='Illustration' src={Illustration} />
        </div>

      </div>


      <div className='LoginSignup'>


        <Dialog modal={false} open={act} onRequestClose={handleActivation}>

        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdSYFNqF6doLkLGBI9rZmaGXo8Jgc08OhA1Np0P_wycMZkQRw/viewform?embedded=true"
          style={{height:"80vh", width:"100%"}}
          >
          Loading...
        </iframe>

        </Dialog>
      </div>

    </div>


    <div className='HomeMid'>

      <div className='Wrapper'>
        <div className='WrapperText'>
          <div >
          <h2> 1. Tell Monetta what you want written down. </h2>
          <p>
          Our software will understand what you tell it to write down.
          Saying your notes out loud will ensure everyone in the team knows exactly what they are responsible for.
          <br></br><br></br>
          Monetta will understand what is dictated during the meeting and update your other workflow software accordingly to
          let you get down to business after the meeting.
          </p>
          </div>
          <div>
          <img className='Dict' src={DictationFeature}/>
          </div>
        </div>
        <div className='WrapperSum'>
          <div className='WrapperSumBlock'>
            <h2> That means automatic Trello task updates, Slack notifications, Calendar appointments, and much more - all based on the content of your meeting</h2>
          </div>
        </div>
      </div>

      <div className='Wrapper' style={{backgroundColor: 'rgb(255,255,255)'}}>
        <div className='WrapperText' style={{color: 'rgb(70,153,255)'}}>
          <div>
            <img className='Repo' src={RepositoryFeature} />
          </div>
          <div>
          <h2> 2. Monetta will store your documentation in a secure and searchable repository.</h2>
          <p>Ever wish you could easily remember the exact outcome of each meeting to make sure you are doing exactly what you are supposed to?
          <br></br><br></br>
          Ever wanted to search through the actual content of the documentation rather than just the file name?
          <br></br><br></br>
          At Monetta we use state-of-the-art cloud infrastructure to design and optimize a repository that you can access through your smartphone or your computer. We make sure you have quick access to any file you need to find.
          </p>
          </div>
        </div>
        <div className='WrapperSum' >
          <div className='WrapperSumBlock' style={{color: 'rgb(70,153,255)'}}>
            <h2> All your meeting documentation will be in a safe, cloud repository, giving you access to incredible search and storage capabilities so you never have to miss a beat again</h2>
          </div>
        </div>
      </div>


      <div className='Wrapper'>
        <div className='WrapperText'>
          <div>
          <h2> 3. Monetta puts productivity data at your fingertips.</h2>
          <p>Monetta analyzes the meeting patterns to give you and your team deep data insights. If you ever wondered what your meetings would look like to a data scientist, this is it.
          <br></br><br></br>
          We let you know the data points that will help you better manage your meetings and make the changes necessary to achieve your team goals:
          <br></br><br></br>
          Maybe you want to keep your average meeting time below 30 minutes.
          <br></br><br></br>
          Maybe your team wants to make sure everyone is receiving deliverables fairly and no one is being overworked.
          <br></br><br></br>
          Or maybe you just want to see some pretty graphs - we dont judge.
          </p>
          </div>
          <div>
          <img className='Data' src={DataFeature} />
          </div>
        </div>
        <div className='WrapperSum'>
          <div className='WrapperSumBlock' style={{marginTop: '1em'}}>
            <h2> Monetta lets you see exactly how your team is performing inside your meetings and gives you the data needed to increase your productivity and get out of your meetings earlier</h2>
          </div>
        </div>

      </div>
    </div>

    <div className='HomeBot'>
      <h1> Our Alpha Users know that this could change it all </h1>
      <div className='Wrapper1'>
        <p> Join the many innovative companies that are helping us design our software and get in your say as well. </p>
      </div>

      <RaisedButton className='BecomeAlpha' label='Become an Alpha User' labelColor='rgb(255,172,77)' onClick={handleActivation}/>

    </div>


  </div>
)

export default HomeComponent;
