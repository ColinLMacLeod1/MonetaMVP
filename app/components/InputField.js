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
    this.capitalize = this.capitalize.bind(this)
  }
  textChange(event, newValue){
    this.setState({
      text: newValue
    })
  }
  capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    return(
      <TextField
        className="field-line"
        floatingLabelText={this.capitalize(this.props.title)}
        value={this.state.text}
        name={this.props.title}
        onChange={(event,newValue) => this.textChange(event,newValue)}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            this.props.submitData(this.state.text,this.props.title)
            this.setState({
              text:''
            })
          }
        }}
      />
    )
  }
}