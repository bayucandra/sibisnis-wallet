import biqHelperUtils from "./utils";
class BiqHelperJSON {

  parse(val) {
    let ret = {};

    if (!biqHelperUtils.isNull(val)) {

      switch (typeof val) {

        case 'object':
          ret = Object.assign({}, val);
          break;

        case 'string':
          try {
            ret = JSON.parse(val);
          } catch (e) {
            console.error(e.message);
          }
          break;
        default:
          ret = {};

      }

    }

    return ret;

  }//parse()

  pathIsNull( ) {
    if (  arguments.length < 2) {
      console.error( 'biqHelper.JSONPathIsNull() : Parameter is invalid' );
      return;
    }

    let json_obj = arguments[0];//JSON object
    let json_path = arguments[1];//String of json path eg: Root.branch.branch.leave

    let json_path_split = json_path.split('.');

    let path_valid = true;

    let cur_path = Object.assign( {}, json_obj );
    if ( biqHelperUtils.isNull( cur_path ) ) return true;

    for ( let i=0; i < json_path_split.length; i++ ) {

      if ( biqHelperUtils.isNull( cur_path ) ) return true;

      if ( cur_path.hasOwnProperty( json_path_split[i] ) ) {
        cur_path = cur_path[json_path_split[i]];
      } else {
        path_valid = false;
        break;
      }
    }

    return !path_valid;

  }

  pathValueGet() {
    if (  arguments.length < 2) {
      console.error( 'biqHelper.JSONPathIsNull() : Parameter is invalid' );
      return;
    }

    let json_obj = arguments[0];//JSON object
    let json_path = arguments[1];//String of json path eg: Root.branch.branch.leave

    if ( this.pathIsNull( json_obj, json_path ) ) return null;

    let json_path_split = json_path.split('.');

    let cur_path = Object.assign( {}, json_obj );

    for ( let i=0; i < json_path_split.length; i++ ) {
      if ( cur_path.hasOwnProperty( json_path_split[i] ) ) {
        cur_path = cur_path[json_path_split[i]];
      }
    }

    return cur_path;

  }

  pathValueGetMulti( ) {
    if (  arguments.length < 2) {
      console.error( 'biqHelper.JSONPathIsNull() : Parameter is invalid' );
      return;
    }

    let json_obj = arguments[0];//JSON object
    let json_path_arr = arguments[1];//Array of String of json key ( not path / 1 level depth ) eg: [key1, key2, key3]

    let ret = {};

    for ( let i=0; i<json_path_arr.length; i++ ) {
      ret[json_path_arr[i]] = this.pathValueGet( json_obj, json_path_arr[i] );
    }

    return ret;

  }

  isEqualShallow( a, b ) {
    let ret = true;
    try {
      for( let key in a ) {
        if( a[key] !== b[key] ) ret =false;
      }

      for( let key in b ) {
        if( b[key] !== a[key] ) ret = false;
      }

    } catch(e){
      console.error( e.message );
      ret = false;
    }
    return ret;
  }

}//class BiqhelperJSON

export { BiqHelperJSON }

const biqHelperJSON = new BiqHelperJSON();
export default biqHelperJSON;