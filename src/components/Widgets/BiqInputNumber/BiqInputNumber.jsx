import React, { Component } from 'react';
import NumberFormat from 'react-number-format'


/*class BiqNumberFormat extends Component {

  render() {

    const { inputRef, onChange, ...other } = this.props;

    return (

      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        // prefix="$"
      />

    );

  }

}*/

const BiqNumberFormat = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      // prefix="$"
    />
  );
}

export default BiqNumberFormat;
