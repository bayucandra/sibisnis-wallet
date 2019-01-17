import phoneProvider from "providers/phoneProvider";

class BiqHelperPhone {

  dashFormat( input ) {

    if( typeof input === 'number') {
      input = input.toString();
    } else if( typeof input !== 'string') {
      return '';
    }

    let ret = '';

    let inc = 0;
    for ( let i=input.length - 1; i>=0; i-- ) {

      ret = input.substring( i, i+1 ) + ret;
      if( (inc + 1) % 4 === 0 && i !== 0 ) {
        ret = '-' + ret;
      }

      inc++;
    }

    return ret;

  }

  isValid( val ) {

    if ( val === null || typeof val === 'undefined' ) {
      val = '';
    }

    switch (typeof val) {
      case 'number':
        val = '0' + val.toString();
        break;
    }

    val = val.replace( / /g, '' );

    let re = /[\d+]/;

    if ( !re.test( val.charAt(0) ) ) {
      return false;
    }

    val = val.substring( 0, 1 ) === '+' ? val.substring( 1, val.length -1 ) : val;

    let country_code = val.substring( 0, 2 );

    let selected_country = phoneProvider.country_default[0];
    if ( phoneProvider.countryIsExist( { val: country_code } ) ) {
      selected_country = phoneProvider.countryGetRecord( {val: country_code} );
      val = '0' + val.substring( 2 );
    }  else if ( val.substring( 0, 1 ) === '0' ) {
      selected_country = phoneProvider.countryGetRecord( {val: selected_country.country_code} );
    } else if ( val.substring( 0, 1 ) !== '0' ) {
      selected_country = phoneProvider.countryGetRecord( {val: selected_country.country_code} );
      val = '0' + val;
    }

    if ( !selected_country.hasOwnProperty( 'country_code' ) ) {
      return false;
    }

    if ( val.length >= 4 ) {

      //BEGIN CHECK IF PREFIX IS VALID=======
      let operator_prefix = val.substring( 0, 4 );

      let country_code = selected_country.country_code;
      let prefix_is_found = false;
      if (
        phoneProvider.operator_prefixes_all_simple.hasOwnProperty( country_code )
        && phoneProvider.operator_prefixes_all_simple[country_code].indexOf( operator_prefix ) !== -1
      ) {
        prefix_is_found = true;
      } else {
        return false;
      }

      //BEGIN CHECK IF LENGTH BETWEEN 8 - 13

      if( prefix_is_found && val.length >= 8 && val.length <=13 ) {
        return true;
      }
    }

    return false;
  }

}

export { BiqHelperPhone };

const biqHelperPhone = new BiqHelperPhone();
export default biqHelperPhone;