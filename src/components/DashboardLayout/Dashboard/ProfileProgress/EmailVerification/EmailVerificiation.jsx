import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import EmailVerificationSuccess from './EmailVerificationSuccess/EmailVerificationSuccess';
import './EmailVerification.css';

const styles = {
  progress:{
    colorPrimary:{
      backgroundColor: '#cccccc'
    }
  }
}

class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'bayu@sibinis-example.com',
      progressIndicator: false,
      emailVerificationStatus: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  onSubmit = () => {
    this.setState({ progressIndicator: true }, () => {
      setTimeout(() => {
        this.setState({ emailVerificationStatus: true, progressIndicator: false });
      }, 3000);
    });
  }

  render() {
    const { progressIndicator, emailVerificationStatus } = this.state;
    return (
      <React.Fragment>
        {emailVerificationStatus ?
          <EmailVerificationSuccess />
          :
          <React.Fragment>
            <div className="email-verification-mobile-container mobile-show__block">
              <div className="email-verification-form">
                <TextField
                  id="email"
                  label="Email"
                  className='email-verification-form__email-input'
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                  disabled
                />
                {progressIndicator ?
                  <LinearProgress
                    style={{
                      'width': '100%'
                    }} /> :
                  <div className="email-verification-form__note">Pastikan email sesuai</div>
                }
                <div className="email-verification-form__button-container">
                  <div className="resend-button ripple" onClick={this.onSubmit.bind(this)}>Lanjutkan</div>
                </div>
              </div>
            </div>
            <div className="email-verification-desktop-container desktop-show__flex">
              <div className="email-verification-form arrow_box">
                <div className="input-field-container">
                  <TextField
                    id="email"
                    label="Email"
                    className='input-field-container__email-input'
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    disabled
                  />
                  <div className="input-field-container__note">Pastikan email sesuai</div>
                </div>

                <div className="email-verification-form__button-container">
                  <div className="resend-button ripple" onClick={this.onSubmit.bind(this)}>Lanjutkan</div>
                </div>
                {progressIndicator ?
                  <LinearProgress
                    style={{
                      'width': '100%',
                      'position': 'absolute',
                      'bottom': 0,
                      'borderBottomRightRadius': '5px',
                      'borderBottomLeftRadius': '5px',
                    }} /> : null}
              </div>
            </div>
          </React.Fragment>}
      </React.Fragment>
    )
  }
}

export default EmailVerification;