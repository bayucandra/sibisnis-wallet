import React, { Component } from 'react';


const styles = {
  'height': '2px',
  'border-top': 'solid 0.5px #efefef'
}

class CustomDivider extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <React.Fragment>
        <div style={styles}></div>
      </React.Fragment>
     )
  }
}

export default CustomDivider;