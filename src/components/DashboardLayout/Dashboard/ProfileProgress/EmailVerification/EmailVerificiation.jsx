// Node Modules
import React, { Component } from 'react';

// React Material
import TextField from '@material-ui/core/TextField';

// Custom Components
import EmailVerificationSuccess from './EmailVerificationSuccess/EmailVerificationSuccess';
import { InfiniteProgressBar } from './../../../../Shared/Progressbar/Progressbar';

// Custom CSS
import './EmailVerification.css';

class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'dwinawan@gmail.com',
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
                  <InfiniteProgressBar />
                  :
                  <div className="email-verification-form__note">Pastikan email sesuai</div>
                }
                <div className="email-verification-form__button-container">
                  <div className={"resend-button ripple " + (progressIndicator ? 'disabled' : '')} onClick={this.onSubmit.bind(this)}>Lanjutkan</div>
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
                  <div className={"resend-button ripple " + (progressIndicator ? 'disabled' : '')} onClick={this.onSubmit.bind(this)}>Lanjutkan</div>
                </div>
                {progressIndicator ?
                  <InfiniteProgressBar />
                  : null}
              </div>
            </div>
          </React.Fragment>}
      </React.Fragment>
    )
  }
}

export default EmailVerification;