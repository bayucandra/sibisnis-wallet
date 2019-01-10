import React from 'react';

import "./FormWrapper.scss";
import biqHelper from "lib/biqHelper";

export default ( props ) => {
  let class_props = !biqHelper.utils.isNull( props.className ) ? ` ${props.className}` : '';
  return (
    <form className={`dashboard-profile-form visible-md-up${ props.isVisible ? ' is-visible' : '' }${ class_props }`}>
      { props.children }
    </form>
  )
}