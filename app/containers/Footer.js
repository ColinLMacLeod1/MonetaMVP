import React from 'react'
import FooterComponent from '../components/FooterComponent.js'


export default class Footer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      act: false
    }

    this.handlePrivacyTerms=this.handlePrivacyTerms.bind(this)
    this.handleActivation = this.handleActivation.bind(this)
  }


  handlePrivacyTerms () {
    console.log('handlePrivacyTerms() (Footer.js)');
    this.props.handlePageChange('PrivacyTerms');
  }

  handleActivation () {
    console.log('handleActivation() (Header.js)');
    if (!this.state.act) {
    this.setState({act: true});
    console.log('Open Dialog');
    } else {
    this.setState({act: false});
    console.log('Close Dialog');
    }
  }
  render () {
    return (
      <div>
        <FooterComponent handlePrivacyTerms={this.handlePrivacyTerms} handleActivation={this.handleActivation} act={this.state.act} />
      </div>
    )
  }
}
