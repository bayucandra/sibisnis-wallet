// Node Modules
import React, { Component } from 'react';

// Local Image
import iconCollapse from './../../../images/icons/ico-collaps.svg';
import iconMinus from './../../../images/icons/ico-minus.svg';

// Custom CSS
import './CustomAccordian.scss';

class CustomAccordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    }
  }

  accordinToggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const { title, date, accordianBody } = this.props;
    return (
      <div className="custom-accordian-container">
        <div className="custom-accordian-container__title ripple" onClick={this.accordinToggle.bind(this)}>
          <div className="custom-accordian-container__title-left">
            <span className="custom-accordian-container__title-left-name">{title}</span>
            <span className="custom-accordian-container__title-left-date"> {date}</span>
          </div>
          <div className="custom-accordian-container__title-right icon-touch-area-container-40">
            {this.state.collapse ?
              <img src={iconMinus} alt="icon-minus" />
              :
              <img src={iconCollapse} alt="icon-plus" />
            }
          </div>
        </div>
        {this.state.collapse ?
          <div className="custom-accordian-container__body">
            {accordianBody}
          </div> : null}
      </div>
    )
  }
}

export default CustomAccordian;