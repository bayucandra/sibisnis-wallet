import React, { Component } from 'react'
import rightArrowIcon from './../../../../images/icons/s-litle-right.svg'
import backBlueIcon from './../../../../images/icons/ico-back-blue.svg'
import { modalToggle } from './../../../../lib/utilities';
import { modalTypes } from './../../../../lib/constants';

class ImagePreviewMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpand: false
    }
  }
  onExpandMenu = (status) => {
    this.setState({ menuExpand: status })
  }

  getImageFromGallery = () => {
    modalToggle.next({ status: true, type: modalTypes.imageUpload })
  }

  render() {
    return (<React.Fragment>

      {!this.state.menuExpand ?
        <div>
          <div className="custom-menu-item ripple" onClick={this.onExpandMenu.bind(this, true)}>
            <div className="custom-menu-item__text">
              <span>Ganti Gambar</span>
              <img src={rightArrowIcon} alt="" />
            </div>
          </div>
          <div className="custom-menu-item ripple" onClick={this.onMenuClose.bind(this)}>
            <div className="custom-menu-item__text">Tutup</div>
          </div>
        </div>
        :
        <div>
          <div className="custom-menu-item expand ripple" onClick={this.onExpandMenu.bind(this, false)}>
            <div className="custom-menu-item__text">
              <img src={backBlueIcon} alt="" />
              <span>Ganti Gambar</span>
            </div>
          </div>
          <div className="custom-menu-item expand ripple" onClick={this.getImageFromGallery.bind(this)}>
            <div className="custom-menu-item__text">Ambil dari galeri</div>
          </div>
          <div className="custom-menu-item expand ripple">
            <div className="custom-menu-item__text">Ambil dari kamera</div>
          </div>
        </div>
      }
    </React.Fragment>)
  }
}

export default ImagePreviewMenu;