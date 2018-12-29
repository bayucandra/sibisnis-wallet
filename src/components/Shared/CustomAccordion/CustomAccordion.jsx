// Node Modules
import React, { Component } from 'react';

// Local Image
import iconCollapse from './../../../images/icons/ico-collaps.svg';
import iconMinus from './../../../images/icons/ico-minus.svg';

// Custom CSS
import './CustomAccordion.scss';

class CustomAccordion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    }
  }

  accordinToggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const { title, date, accordionBody } = this.props;
    return (
      <div className="custom-accordion-container">
        <div className="custom-accordion-container__title ripple" onClick={this.accordinToggle.bind(this)}>
          <div className="custom-accordion-container__title-left">
            <span className="custom-accordion-container__title-left-name">{title}</span>
            <span className="custom-accordion-container__title-left-date"> {date}</span>
          </div>
          <div className="custom-accordion-container__title-right icon-touch-area-container-40">
            {this.state.collapse ?
              <img src={iconMinus} alt="icon-minus" />
              :
              <img src={iconCollapse} alt="icon-plus" />
            }
          </div>
        </div>
        {this.state.collapse ?
          <div className="custom-accordion-container__body">
            {accordionBody}
          </div> : null}
      </div>
    )
  }
}

export default CustomAccordion;

const HistoryList = (props) => {
  const { country, ip, browser } = props;
  return (
    <div className="history-list-container">
      <div className="history-list">
        <div className="history-list__title">Negara</div>
        <div className="history-list__name">{country}</div>
      </div>
      <div className="history-list">
        <div className="history-list__title">IP</div>
        <div className="history-list__name">{ip}</div>
      </div>
      <div className="history-list">
        <div className="history-list__title">Browser</div>
        <div className="history-list__name">{browser}</div>
      </div>
    </div>
  )
};

export { HistoryList };