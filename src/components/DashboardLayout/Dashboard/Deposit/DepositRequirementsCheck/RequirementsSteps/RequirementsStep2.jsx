// Node Modules
import React, { Component } from 'react';

// Custom Libraries
import { modalTypes } from './../../../../../../lib/constants';
import { modalToggle } from './../../../../../../lib/utilities';

// Local Images
import finishIcon from './../../../../../../images/icons/ico-camera-finish.svg';


class RequirementsStep2 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  onCompleteAddress = () => {
    modalToggle.next({ status: true, type: modalTypes.addressForm });
  }

  render() {
    const { status, active } = this.props;
    return (
      <div className="requirements-step">
        <div className="requirements-step__header">
          <div className={"step-number " + (!active ? 'step-number-disabled' : '')}>
            {!status ?
              <span className="step-number__text">2</span>
              :
              <img src={finishIcon} alt="" />
            }
          </div>
          <div className="step-title">Data Alamat</div>
        </div>
        {active ?
          <React.Fragment>
            {!status ?
              <div className="requirements-step__body">
                <div className="step-description">Data alamat juga digunakan sebagai syarat untuk melakukan penambahan deposit dan aktifitas lainnya</div>
                <div className="step-button ripple" onClick={this.onCompleteAddress.bind(this)}>
                  <span className="step-button__text">Lengkapi alamat</span>
                </div>
              </div>
              :
              <div className="requirements-step__body">
                <div className="step-description">Selamat anda saat ini sudah bisa melakukan penambahan saldo, namun demi kenyamanan anda silahkan isi data identitas anda dan dapatkan banyak manfaat serta keuntungannya</div>
                <div className="step-description">Anda bisa melewati langkah ini dan sewaktu-waktu anda bisa meningkatkan status akun dengan mengisi data identitas</div>
                <div className="step-button ripple disabled">
                  <span className="step-button__text">Tambah deposit sekarang</span>
                </div>
                <div className="step-button ripple">
                  <span className="step-button__text">Lengkapi alamat</span>
                </div>
              </div>
            }
          </React.Fragment>
          : null}
      </div>
    )
  }
}

export default RequirementsStep2;