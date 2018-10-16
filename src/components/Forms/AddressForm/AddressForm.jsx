import React, { Component } from 'react';

import Input from '@material-ui/core/Input';

// Local Images
import closeIconBlack from './../../../images/icons/ico-close-black.svg';

// Custom Components
import AutoSuggestSelect from './../../Shared/AutoSuggestSelect/AutoSuggestSelect';
import { InfiniteProgressBar } from './../../Shared/Progressbar/Progressbar';

// Custom CSS
import './AddressForm.scss';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="address-form-container">
        <div className="form-header">
          <div className="form-header__title">Alamat</div>
          <div className="form-header__close-icon">
            <img src={closeIconBlack} alt="close-icon-black" />
          </div>
        </div>
        <div className="form-body">
          <AutoSuggestSelect />
          <AutoSuggestSelect />
          <AutoSuggestSelect />
          <AutoSuggestSelect />
          <Input
            placeholder="Placeholder"
            inputProps={{
              'aria-label': 'address',
            }}
            className="address-input"
            style={{ width: '100%', marginTop: '10px' }}
          />

          <div className="form-actions">
            <div className="form-actions__cancel layout-center ripple">
              <div className="form-actions-btn-text">BATAL</div>
            </div>
            <div className="form-actions__save layout-center ripple">
              <div className="form-actions-btn-text">Simpan</div>
            </div>
          </div>
        <InfiniteProgressBar/>
        </div>
      </div>
    );
  }
}

export default AddressForm;