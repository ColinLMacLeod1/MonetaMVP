import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List';
import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0
    };

    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getStepContent = this.getStepContent.bind(this)
  }

  handleNext() {
    const stepIndex = this.state.stepIndex;
    if (stepIndex < 3) {
      this.setState({stepIndex: stepIndex + 1});
    }
  }

  handlePrev() {
    const stepIndex = this.state.stepIndex;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      case 3:
        return "Numba 3 m'lord, pick numba 3";
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render(){
    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper linear={false} activeStep={this.state.stepIndex}>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 0})}>
              Creating a new meeting
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 1})}>
              Druring the meeting
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 2})}>
              After the meeting
            </StepButton>
          </Step>
          <Step>
            <StepButton onClick={() => this.setState({stepIndex: 3})}>
              Your repository
            </StepButton>
          </Step>
        </Stepper>
        <div >
          <p>{this.getStepContent(this.state.stepIndex)}</p>
          <div style={{marginTop: 12}}>
            <FlatButton
              label="Back"
              disabled={this.state.stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label="Next"
              disabled={this.state.stepIndex === 3}
              primary={true}
              onClick={this.handleNext}
            />
          </div>
        </div>
      </div>
    )
  }
}
