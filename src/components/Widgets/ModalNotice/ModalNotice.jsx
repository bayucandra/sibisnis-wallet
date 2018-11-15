import React, {Component} from 'react';
import { Button } from '../../Widgets/material-ui';
import "./ModalNotice.scss";
import biqHelper from "../../../lib/biqHelper";

class ModalNotice extends Component {

  state = {
    modalPosTop: 0,
  };

  _modalPosTopGen() {
    let ratio_opt = { box_selector: '.widget-modal-notice', top_space: 200, bottom_space: 699};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 3;
      ratio_opt.bottom_space = 4;
    }

    return biqHelper.utils.modalTopRatio( ratio_opt );
  }

  componentDidMount() {
    let top_pos = this._modalPosTopGen();
    this.setState( {modalPosTop : top_pos } );
  }

  componentDidUpdate(prevProp, prevState){
    let top_pos = this._modalPosTopGen();
    if ( prevState.modalPosTop !== top_pos ) {
      this.setState( { modalPosTop: top_pos } );
    }
  }

  render() {

    return (
      <section className="widget-modal-notice" style={{marginTop: this.state.modalPosTop}}>
        <div className="icon"></div>
        <div className="title">{this.props.title}</div>
        <div className="notice">{this.props.notice}</div>
        <Button className="close-btn" onClick={() => biqHelper.utils.clickTimeout(()=>this.props.modalClose())}>Tutup</Button>
      </section>
    );

  }

}

export default ModalNotice;