import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import {Subject} from 'rxjs';
import {ajax as rxAjax} from 'rxjs/ajax';
import {takeUntil, map} from 'rxjs/operators';

import biqConfig from "providers/biqConfig";

import userActions from "redux/actions/global/userActions";
import appActions from "redux/actions/global/appActions";

import Select from 'react-select';
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

import "styles/components/_loading-indicator.scss";
import "./DialogAddressInput.scss";

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
  return (
    <Typography
      color="textSecondary"
      className={"input-place-holder"}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
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

class DialogAddressInput extends React.Component {
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

    modalPosTop: 0,

    is_submitting: false,
    submit_response: {
      status_title: 'Gagal',
      response_code: { status:200, message: '' }
    },
    modal_notice_is_open: false
  };


  stop$ = new Subject();

  dialogRef = React.createRef();

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

  _provinsiChange = () => {

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

      this.setState({ kabupaten_data: address_mapped });
      this.setState( { kabupaten_is_loading: false } );
      $('.select-dropdown--kabupaten .mui-text-field__input input[type="text"]').focus();
    } );

  };

  _kabupatenChange = () => {

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

      this.setState({ kecamatan_data: address_mapped });
      this.setState( { kecamatan_is_loading: false } );
      $('.select-dropdown--kecamatan .mui-text-field__input input[type="text"]').focus();

    } );

  };

  _kecamatanChange = () => {

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

        this.setState({ kelurahan_data: address_mapped });
        this.setState( { kelurahan_is_loading: false } );
        $('.select-dropdown--kelurahan .mui-text-field__input input[type="text"]').focus();

      } );

  };

  _kelurahanChange = () => {

    if(biqHelper.utils.isNull(this.state.kelurahan_selected)) return;

    $('.address-input-dialog .alamat textarea').focus();
  };

  _modalPosTopGen() {
    let ratio_opt = { box_selector: '.address-input-dialog', top_space: 260, bottom_space: 329};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 63;
      ratio_opt.bottom_space = 62;
    }

    return biqHelper.utils.modalTopRatio( ratio_opt );
  }

  _modalClose = ()=>{
    biqHelper.utils.clickTimeout(() => {
      let {dispatch} = this.props;
      dispatch( appActions.appDialogAddressClose() );
    });
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
        ...biqConfig.rxAjaxOptions,
        body: Object.assign( data, biqConfig.api.data_auth )
      });

/*      ajax$ = throwError({
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
              dispatch( userActions.userProfileUpdate( { alamat: res.data.alamat } ) );
              this._modalClose();
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


    setTimeout(()=>{
      let top_pos = this._modalPosTopGen();
      this.setState( { modalPosTop: top_pos } );
    },100);

  }

  componentDidUpdate(prevProp, prevState, snapshot){

    setTimeout(()=>{
      let top_pos = this._modalPosTopGen();
      if ( prevState.modalPosTop !== top_pos ) {
        this.setState( { modalPosTop: top_pos } );
      }
    },100);

  }

  componentWillUnmount() {
    this.stop$.next();
    this.stop$.complete();
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
      <Modal
        open={this.props.dialog_address_input.is_open}
        onClose={this._modalClose}>

        <div className="modal-inner">


          <div className={`address-input-dialog ${classes.root}`} ref={this.dialogRef} style={{ marginTop: this.state.modalPosTop }}>

            <Button className="modal-close-btn" onClick={this._modalClose} >&nbsp;</Button>

            <div className="address-input-dialog__title">Alamat</div>

            <div className="address-input-dialog__body">

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
                placeholder="Alamat"
                className="mui-text-area mui-text-area--no-label alamat"
                value={this.state.alamat}
                onChange={ e => this.setState({ alamat : e.target.value }) }/>

            </div>

            <div className="address-input-dialog__footer-action">

              <Button className="cancel-btn" onClick={this._modalClose}>BATAL</Button>
              <Button className="submit-btn" onClick={this._onSubmit}>Simpan</Button>

            </div>

            { this.state.is_submitting ? <LoadingIndicatorBar/> : '' }

            <Modal
              open={this.state.modal_notice_is_open}
              onClose={this._modalNoticeClose}>

              <div className="modal-inner">
                <ModalNotice modalClose={this._modalNoticeClose} title={this.state.submit_response.status_title} notice={this.state.submit_response.response_code.message}/>
              </div>

            </Modal>

          </div>


        </div>

      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    dialog_address_input: state.app.dialog_address_input
  }
};

export default withRouter(
  connect( mapStateToProps ) (
    withStyles(styles, { withTheme: true }) (DialogAddressInput )
  )
) ;
