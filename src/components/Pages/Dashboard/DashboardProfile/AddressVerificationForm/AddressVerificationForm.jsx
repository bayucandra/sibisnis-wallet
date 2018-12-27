import React, {Component} from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {Subject} from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import {takeUntil, map} from 'rxjs/operators';

import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {Button} from 'components/Widgets/material-ui';
import Modal from '@material-ui/core/Modal';
import $ from 'jquery';

import biqHelper from "lib/biqHelper";
import addressProvider from "providers/addressProvider";
import LoadingIndicatorBar from "components/Widgets/LoadingIndicatorBar";
import ModalNotice from "components/Widgets/ModalNotice/ModalNotice";

import biqConfig from "providers/biqConfig";
import userActions from "redux/actions/global/userActions";

import FormWrapper from "../FormWrapper";

import "./AddressVerificationForm.scss";

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: 100
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      className="mui-text-field"
      label={props.selectProps.placeholder}
      InputLabelProps= {{
        shrink: props.isFocused || props.selectProps.menuIsOpen || !biqHelper.utils.isNull( biqHelper.JSON.pathValueGet(props.selectProps, 'value.label') )
      }}

      InputProps={{
        inputComponent,
        inputProps: {
          className: "mui-text-field__input",
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return null;
}

function SingleValue(props) {
  return (
    <span className="mui-text-field__display" {...props.innerProps}>
      { props.children }
    </span>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

const Menu = (props) => {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
};

const LoadingIndicator = () => {
  return (
    <div className="loading-indicator">
      <div className="c-loading-indicator">
        <div className="c-loading-indicator__circle"/>
      </div>
    </div>
  );
};

const IndicatorSeparator = ({ innerProps }) => {
  return (
    <span style={{display: 'none'}}/>
  );
};

const DropdownIndicator = (props) => {
  return components.DropdownIndicator && (
    <div className="dropdown-indicator"/>
  );
};

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  LoadingIndicator,
  IndicatorSeparator,
  DropdownIndicator
};

class AddressVerificationForm extends Component {

  state = {
    provinsi_selected: null,
    provinsi_is_loading: false,
    provinsi_data: [],

    kabupaten_selected: null,
    kabupaten_is_loading: false,
    kabupaten_data: [],

    kecamatan_selected: null,
    kecamatan_is_loading: false,
    kecamatan_data: [],

    kelurahan_selected: null,
    kelurahan_is_loading: false,
    kelurahan_data: [],

    alamat: '',

    is_submitting: false,
    submit_response: {
      status_title: 'Gagal',
      response_code: { status:200, message: '' }
    },
    modal_notice_is_open: false
  };


  stop$ = new Subject();

  _selectOptionChange = name => value => {

    let record_changed = {};
    record_changed[`${name}_selected`] = value;

    this.setState( record_changed, ()=>{

      switch ( name ) {

        case "provinsi":
          this._provinsiChange();
          break;
        case "kabupaten":
          this._kabupatenChange();
          break;
        case "kecamatan":
          this._kecamatanChange();
          break;
        case "kelurahan":
          this._kelurahanChange();
          break;

        default:
      }

    } );

  };

  _provinsiChange = ( p_obj = {} ) => {

    let params = {
        callback: null,
        callback_params: null
      };

    Object.assign( params, p_obj );

    this.setState({ kabupaten_selected: null });
    this.setState({ kabupaten_data: [] });

    this.setState({ kecamatan_selected: null });
    this.setState({ kecamatan_data: [] });

    this.setState({ kelurahan_selected: null });
    this.setState({ kelurahan_data: [] });

    if(biqHelper.utils.isNull(this.state.provinsi_selected)) return;

    this.setState( { kabupaten_is_loading: true } );
    addressProvider.kabupaten$().subscribe( data => {
      let address_mapped = data
        .filter( el => {
          return el.id_provinsi === this.state.provinsi_selected.value.id;
        } )
        .map( el => ({
          label: biqHelper.string.capitalize( el.nama ),
          value: { label: el.nama, id: el.id_kotakab }
        }) );

      this.setState({ kabupaten_data: address_mapped }, () => {
        if ( typeof params.callback === 'function') {
          params.callback( params.callback_params );
        }
      });
      this.setState( { kabupaten_is_loading: false } );
      let input_field = $('.select-dropdown--kabupaten .mui-text-field__input input[type="text"]');

      input_field.focus();

    } );

  };

  _kabupatenChange = ( p_obj ) => {

    let params = {
      callback: null,
      callback_params: null
    };

    Object.assign( params, p_obj );

    this.setState({ kecamatan_selected: null });
    this.setState({ kecamatan_data: [] });

    this.setState({ kelurahan_selected: null });
    this.setState({ kelurahan_data: [] });

    if(biqHelper.utils.isNull(this.state.kabupaten_selected)) return;

    this.setState( { kecamatan_is_loading: true } );
    addressProvider.kecamatan$().subscribe( data => {
      let address_mapped = data
        .filter( el => {
          return el.id_kotakab === this.state.kabupaten_selected.value.id;
        } )
        .map( el => ({
          label: biqHelper.string.capitalize( el.nama ),
          value: { label: el.nama, id: el.id_kecamatan }
        }) );

      this.setState({ kecamatan_data: address_mapped }, () => {
        if ( typeof params.callback === 'function') {
          params.callback( params.callback_params );
        }
      } );

      this.setState( { kecamatan_is_loading: false } );
      $('.select-dropdown--kecamatan .mui-text-field__input input[type="text"]').focus();

    } );

  };

  _kecamatanChange = ( p_obj ) => {

    let params = {
      callback: null,
      callback_params: null
    };

    Object.assign( params, p_obj );

    if(biqHelper.utils.isNull(this.state.kecamatan_selected)) return;

    this.setState( { kelurahan_is_loading: true } );
    addressProvider.kelurahanFetch$( this.state.kecamatan_selected.value.id )
      .pipe( takeUntil( this.stop$ ) )
      .subscribe( res => {
        let address_mapped = res.data
          .map( el => ({
            label: biqHelper.string.capitalize( el.nama ),
            value: { label: el.nama, id: el.id_kelurahan }
          }) );

        this.setState({ kelurahan_data: address_mapped }, () => {
          if ( typeof params.callback === 'function') {
            params.callback( params.callback_params );
          }
        });
        this.setState( { kelurahan_is_loading: false } );
        $('.select-dropdown--kelurahan .mui-text-field__input input[type="text"]').focus();

      } );

  };

  _kelurahanChange = ( p_obj ) => {

    let params = {
      callback: null,
      callback_params: null
    };

    Object.assign( params, p_obj );

    if(biqHelper.utils.isNull(this.state.kelurahan_selected)) return;

    let address_input_el = $('.address-verification-form .alamat textarea');
    address_input_el.focus();

    if ( typeof params.callback === 'function') {
      params.callback( params.callback_params );
    }

  };

  _addressInputDesktopToggle = ()=>{
    biqHelper.utils.clickTimeout(()=>this.props.addressInputDesktopToggle());
  };

  _modalNoticeOpen = () => {
    this.setState({modal_notice_is_open: true});
  };

  _modalNoticeClose = () =>  {
    this.setState({modal_notice_is_open: false});
  };

  _onSubmit = () => {
    biqHelper.utils.clickTimeout( () => this._onSubmitActual() );
  };

  _onSubmitActual = () => {
    let {dispatch} = this.props;
    let is_valid = !biqHelper.utils.isNullSome( this.state.provinsi_selected, this.state.kabupaten_selected, this.state.kecamatan_selected, this.state.kelurahan_selected, this.state.alamat );

    if ( is_valid ) {

      let data = {
        provinsi: this.state.provinsi_selected.value.label,
        kotakab: this.state.kabupaten_selected.value.label,
        kecamatan: this.state.kecamatan_selected.value.label,
        kelurahan: this.state.kelurahan_selected.value.label,
        alamat: this.state.alamat
      };

      this.setState({is_submitting: true});
      let ajax$ = rxAjax({
        url: `${biqConfig.api.url_base}/api/address/edit`,
        method: 'POST',
        crossDomain: true,
        withCredentials: true,
        body: Object.assign( data, biqConfig.api.data_auth )
      });
/*
      ajax$ = throwError({
        xhr: {
          status: 404,
          response: {
            "response_code": {
              "status": 404,
              "message": "There is error on database process."
            },
            "data": null
          }
        }
      });*/

      ajax$.pipe(
          takeUntil( this.stop$ ),
          map( e => e.response )
        )
        .subscribe(

          res => {

            if ( biqHelper.utils.httpResponseIsSuccess( res.response_code.status ) ) {
              dispatch( userActions.userProfileUpdate( {alamat: res.data.alamat} ) );
              this._addressInputDesktopToggle();
            }

            // this.setState( { submit_response: Object.assign( {}, this.state.submit_response, { status_title: status_title }, res ) } );

            this.setState({is_submitting: false});
          },

          err => {
            let error_message = biqHelper.JSON.pathValueGet( err, 'xhr.response.response_code.message' );
            error_message = biqHelper.utils.isNull( error_message ) ? err.xhr.status : error_message;

            this.setState({
              submit_response: Object.assign(
                {},
                this.state.submit_response, { status_title: 'Gagal', response_code: {message: error_message} }
              )
            });
            this._modalNoticeOpen();
            this.setState({is_submitting: false});
          }

        );

    } else {
      this.setState( {
        submit_response: Object.assign(
          {},
          this.state.submit_response, { status_title: 'Input tidak valid', response_code: { message: 'Harap periksa kembali data yang anda input.' } }
        )
      } );
      this._modalNoticeOpen();
    }
  };

  _loadSavedAddress = ( p_ls ) => {
    if ( p_ls === 'alamat' ) {
      let alamat_ls = this.props.user_profile.alamat;
      if ( !biqHelper.utils.isNull( alamat_ls ) ) {
        this.setState( { alamat : alamat_ls } );
      }
      return;
    }

    let address_keys = [
      {ls: 'prov', data: 'provinsi_data', selected: 'provinsi_selected'},
      {ls: 'kab', data: 'kabupaten_data', selected: 'kabupaten_selected'},
      {ls: 'kec', data: 'kecamatan_data', selected: 'kecamatan_selected' },
      {ls: 'kelurahan', data: 'kelurahan_data', selected: 'kelurahan_selected'} ];

    let key = address_keys.filter( el => el.ls === p_ls )[0];

    let ls_val = this.props.user_profile[key.ls];
    if ( !biqHelper.utils.isNull( ls_val ) ) {
      ls_val = ls_val.toLowerCase();
      let option_data = this.state[key.data];
      let option_select = option_data.filter( el => el.label.toLowerCase() === ls_val )[0];
      let state = {};
      state[key.selected] = option_select;
      this.setState( state, () => {

        switch ( p_ls ) {

          case 'prov':
            this._provinsiChange( { callback: this._loadSavedAddress, callback_params: 'kab' } );
            break;

          case 'kab':
            this._kabupatenChange( { callback: this._loadSavedAddress, callback_params: 'kec' } );
            break;

          case 'kec':
            this._kecamatanChange( { callback: this._loadSavedAddress, callback_params: 'kelurahan' } );
            break;

          case 'kelurahan':
            this._kelurahanChange({ callback: this._loadSavedAddress, callback_params: 'alamat' });
            break;

          default:

        }

      } );
    }

  };

  componentDidMount(){

    this.setState( { provinsi_is_loading: true } );
    addressProvider.provinsi$()
      .subscribe( data => {
        let provinsi_mapped = data.map( response =>({
          label: biqHelper.string.capitalize(response.nama_provinsi),
          value: {label: response.nama_provinsi, id: response.id_provinsi}
        }));

        this.setState({ provinsi_data: provinsi_mapped });
        this.setState( { provinsi_is_loading: false } );
      } );

    addressProvider.kecamatan$().subscribe();

    setTimeout( () => {
      this._loadSavedAddress( 'prov' );
    }, 100);

  }

  componentWillUnmount() {
    this.stop$.next();
    this.stop$.complete();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ( prevProps.isVisible && !this.props.isVisible && !this.state.is_submitting ) {
      this._loadSavedAddress('prov');
    }
  }

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    let kabupaten_is_disabled = this.state.kabupaten_is_loading || biqHelper.utils.isNull(this.state.provinsi_selected);
    let kecamatan_is_disabled = this.state.kecamatan_is_loading || biqHelper.utils.isNull(this.state.kabupaten_selected);
    let kelurahan_is_disabled = this.state.kelurahan_is_loading || biqHelper.utils.isNull(this.state.kecamatan_selected);

    return (
      <>
        <FormWrapper className="address-verification-form" isVisible={this.props.isVisible}>

          <Select
            className={"select-dropdown"}
            classes={classes}
            styles={selectStyles}
            options={this.state.provinsi_data}
            noOptionsMessage={() => "Provinsi tidak ditemukan"}
            components={components}
            value={this.state.provinsi_selected}
            onChange={this._selectOptionChange('provinsi')}
            placeholder="Provinsi"
            isDisabled={this.state.provinsi_is_loading}
            isLoading={this.state.provinsi_is_loading}
          />

          <Select
            className={`select-dropdown select-dropdown--kabupaten${kabupaten_is_disabled ? ' is-disabled' : ''}`}
            classes={classes}
            styles={selectStyles}
            options={this.state.kabupaten_data}
            noOptionsMessage={() => "Kabupaten/kota tidak ditemukan"}
            components={components}
            value={this.state.kabupaten_selected}
            onChange={this._selectOptionChange('kabupaten')}
            placeholder="Kota/Kabupaten"
            isDisabled={kabupaten_is_disabled}
            isLoading={this.state.kabupaten_is_loading}
          />

          <Select
            className={`select-dropdown select-dropdown--kecamatan${kecamatan_is_disabled ? ' is-disabled' : ''}`}
            classes={classes}
            styles={selectStyles}
            options={this.state.kecamatan_data}
            noOptionsMessage={() => "Kecamatan tidak ditemukan"}
            components={components}
            value={this.state.kecamatan_selected}
            onChange={this._selectOptionChange('kecamatan')}
            placeholder="Kecamatan"
            isDisabled={kecamatan_is_disabled}
            isLoading={this.state.kecamatan_is_loading}
          />

          <Select
            className={`select-dropdown select-dropdown--kelurahan${kelurahan_is_disabled ? ' is-disabled' : ''}`}
            classes={classes}
            styles={selectStyles}
            options={this.state.kelurahan_data}
            noOptionsMessage={() => "Kelurahan/desa tidak ditemukan"}
            components={components}
            value={this.state.kelurahan_selected}
            onChange={this._selectOptionChange('kelurahan')}
            placeholder="Kelurahan/Desa"
            isDisabled={kelurahan_is_disabled}
            isLoading={this.state.kelurahan_is_loading}
          />

          <TextField
            fullWidth multiline={true}
            label="Alamat"
            className="mui-text-area alamat"
            value={this.state.alamat}
            onChange={ e => this.setState({ alamat : e.target.value }) }/>

          <div className="action-footer">
            <Button className={`submit-btn${this.state.is_submitting ? ' is-submitting' : ''}`} onClick={this._onSubmit}>Simpan</Button>
          </div>

          <LoadingIndicatorBar isVisible={this.state.is_submitting}/>




          <Modal
            open={this.state.modal_notice_is_open}
            onClose={this._modalNoticeClose}>

            <div className="modal-inner">
              <ModalNotice modalClose={this._modalNoticeClose} title={this.state.submit_response.status_title} notice={this.state.submit_response.response_code.message}/>
            </div>

          </Modal>


        </FormWrapper>
      </>
    );
  }

}

const mapStateToProps = state => {

  return {
    user_profile: state.user.profile
  }

};

export default withRouter(
  connect( mapStateToProps ) (
    withStyles( styles, {withTheme: true} ) ( AddressVerificationForm )
  )
);