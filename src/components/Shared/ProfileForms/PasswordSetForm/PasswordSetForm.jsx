import React, {Component} from 'react';

import {TextField} from "@material-ui/core";
import {PasswordField} from "components/Widgets/material-ui";

import FormWrapper from "../FormWrapper";

import "./PasswordSetForm.scss";

class PasswordSetForm extends Component {

  render() {
    return (

      <FormWrapper className="password-set-form" isVisible={this.props.isVisible}>

        <PasswordField
          label="Password lama"
          error={false}
          helperText={""}/>

        <PasswordField
          label="Password baru"
          error={false}
          helperText={""}/>

        <PasswordField
          label="Konfirmasi password"
          error={false}
          helperText={""}/>

      </FormWrapper>

    );
  }

}

export default PasswordSetForm;