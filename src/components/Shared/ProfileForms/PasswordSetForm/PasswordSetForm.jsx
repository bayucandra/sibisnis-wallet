import React, {Component} from 'react';

import FormWrapper from "../FormWrapper";

class PasswordSetForm extends Component {

  render() {
    return (

      <FormWrapper className="password-set-form" isVisible={this.props.isVisible}>

      </FormWrapper>

    );
  }

}

export default PasswordSetForm;