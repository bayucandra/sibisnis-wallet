import React, {Component} from 'react';

import biqHelper from "../../../../lib/biqHelper";

import Button from "@material-ui/core/es/Button/Button";

import "./CameraCapture.scss";

class CameraCapture extends Component {

  state = {
    modalPosTop: 0
  };

  _modalClose = () => {
    biqHelper.utils.clickTimeout( () => this.props.modalClose() );
  };

  _modalPosTopGen() {
    let ratio_opt = { box_selector: '.camera-capture-dialog', top_space: 252, bottom_space: 252};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 50;
      ratio_opt.bottom_space = 120;
    }
    return biqHelper.utils.modalTopRatio( ratio_opt );
  }

  componentDidMount(){
    let top_pos = this._modalPosTopGen();
    this.setState( {modalPosTop : top_pos } );
  }

  render() {
    return (
      <div className="camera-capture-dialog" style={{ marginTop: this.state.modalPosTop }}>

        <div className="header">

          <div className="header__text">Ambil Foto</div>

          <Button className="header__close-btn" onClick={ this._modalClose }>&nbsp;</Button>

        </div>



        <div className="body">

        </div>

        <div className="footer">

        </div>

      </div>
    );
  }

}

export default CameraCapture;