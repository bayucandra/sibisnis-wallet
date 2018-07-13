// Node Modules
import React, { Component } from 'react';

// Custom Libraries
import { modalToggle } from './../../../../../../lib/utilities';
import { modalTypes } from './../../../../../../lib/constants';

// Local Images
import finishIcon from './../../../../../../images/icons/ico-camera-finish.svg';


class RequirementsStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }


  onAddPhotoClick = () =>{
    modalToggle.next({ status: true, type: modalTypes.imageUpload });
  }

  render() {
    const {status, active} = this.props;
    return (
      <div className="requirements-step">
        <div className="requirements-step__header">
          <div className={"step-number " + (!active ? 'step-number-disabled' : '')}>
            {!status ?
              <span className="step-number__text">1</span>
              :
              <img src={finishIcon} alt="" />
            }
          </div>
          <div className="step-title">Foto profile</div>
        </div>
        {active ?
          <React.Fragment>
            {!status ?
              <div className="requirements-step__body">
                <div className="step-description">Tambahkan foto profile anda untuk bisa melakukan aktifitas dasar yaitu topup deposit</div>
                <div className="step-button ripple" onClick={this.onAddPhotoClick.bind(this)}>
                  <span className="step-button__text">Lengkapi alamat</span>
                </div>
              </div>
              :
              <div className="requirements-step__body completed">

              </div>
            }
          </React.Fragment>
          :null}
      </div>
    )
  }
}

export default RequirementsStep1;