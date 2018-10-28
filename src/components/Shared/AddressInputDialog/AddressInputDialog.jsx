
import React from 'react';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import "./AddressInputDialog.scss";
import biqHelper from "../../../lib/biqHelper";


const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

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
  singleValue: {
    fontSize: 16,
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
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
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
}

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
  IndicatorSeparator,
  DropdownIndicator
};

class AddressInputDialog extends React.Component {
  state = {
    single: null,
    modalPosTop: 0
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
  };

  _modalPosTopGen() {
    let ratio_opt = { box_selector: '.address-input-dialog', top_space: 260, bottom_space: 329};
    if ( biqHelper.mediaQuery.isMobile() ) {
      ratio_opt.top_space = 63;
      ratio_opt.bottom_space = 62;
    }

    return biqHelper.utils.modalTopRatio( ratio_opt );
  }

  componentDidMount(){
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

    return (
      <div className={`address-input-dialog ${classes.root}`} style={{ marginTop: this.state.modalPosTop }}>

        <div className="address-input-dialog__title">Alamat</div>

        <div className="address-input-dialog__body">

          <Select
            className={"select-dropdown"}
            classes={classes}
            styles={selectStyles}
            options={suggestions}
            components={components}
            value={this.state.single}
            onChange={this.handleChange('single')}
            placeholder="Propinsi"
          />

        </div>

      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddressInputDialog);