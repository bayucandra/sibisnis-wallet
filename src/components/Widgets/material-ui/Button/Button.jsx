import React, {Component} from 'react';

import {Button as MUIButton} from '@material-ui/core';


class Button extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <MUIButton {...this.props } component="div">{this.props.children}</MUIButton>
    );
  }

}

export default Button;