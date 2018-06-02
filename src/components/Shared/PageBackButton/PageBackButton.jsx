import React, { Component } from 'react';
import BackBlueIcon from './../../../images/icons/back-blue.svg';
import './PageBackButton.css';
import { withRouter } from 'react-router-dom';

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
        <div className="icon-container" onClick={this.onPageBack.bind(this)}>
          <img src={BackBlueIcon} alt="back-blue-icon" />
        </div>
        <div className="back-btn-text">Kembali</div>
      </div>
    )
  }
}

export default withRouter(PageBackButton);