// Node Modules
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Local Images
import BackBlueIcon from './../../../images/icons/back-blue.svg';

// Custom CSS
import './PageBackButton.scss';
class PageBackButton extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onPageBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="back-btn-container">
        <div className="icon-container ripple opacity-background" onClick={this.onPageBack.bind(this)}>
          <img src={BackBlueIcon} alt="back-blue-icon" />
        </div>
        <div className="back-btn-text">Kembali</div>
      </div>
    )
  }
}

export default withRouter(PageBackButton);