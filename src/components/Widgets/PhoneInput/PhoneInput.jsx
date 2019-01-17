import React, {Component} from 'react';

import biqHelper from "../../../lib/biqHelper";

import { Button } from "../../../components/Widgets/material-ui";

import "./PhoneInput.scss";

class PhoneInput extends Component {

  state = {
    input: {
      is_valid: false,
      value: ''
    }

  };

  _inputChange = ( e ) => {
    let value = e.target.value;

    let value_test = value;
    let is_valid = biqHelper.phone.isValid( value_test );

    this.setState( {
      input: Object.assign( {}, this.state.input, { is_valid, value } )
    } );

    if( !biqHelper.utils.isNull( this.props.onChange ) ) this.props.onChange({ is_valid, value });

  };

  _clearValue = () => {

    biqHelper.utils.clickTimeout( () => {

      this.setState({
        input: {
          is_valid: false,
          value: ''
        }
      });

    });

  };

  render() {

    let className = !biqHelper.utils.isNull( this.props.className ) ? ` ${this.props.className}` : '';

    return (
      <div className={`w-phone-input${className}`}>

        <div className="w-phone-input__label">
          { this.props.label }
        </div>

        <div className="w-phone-input__input">

          <div className="w-phone-input__input__country-code">+62</div>

          <input className="w-phone-input__input__field no-spinner" type="number"
                value={this.state.input.value}
                onChange={this._inputChange}/>

          <Button className="w-phone-input__input__clear-btn" onClick={this._clearValue}>&nbsp;</Button>

        </div>

        <div className="w-phone-input__notice">
          {
            !this.state.input.is_valid && !biqHelper.utils.isNull( this.state.input.value ) && this.state.input.value.length > 7
            && <span className="error">No HP tidak valid</span>
          }
        </div>

      </div>
    );

  }

}

PhoneInput.defaultProps = {
  label: "Label",
  className: "",
  onChange: null
};

export default PhoneInput;