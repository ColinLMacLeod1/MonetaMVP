import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Meeting extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      text:''
    }
    this.textChange = this.textChange.bind(this)
  }
  textChange(event, newValue){
    this.setState({
      text: newValue
    })
    console.log(this.state.text)
  }
  render() {
    return(
      <TextField
        className="field-line"
        value={this.state.text}
        floatingLabelText="Decision"
        name={this.props.title}
        onChange={(event,newValue)=>this.textChange(event,newValue)}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            this.props.submit(this.state.text,this.props.title)
          }
        }}
      />
    )
  }
}
