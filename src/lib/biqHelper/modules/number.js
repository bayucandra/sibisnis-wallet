class BiqHelperNumber {

  roundFloat(number, precision) {
    return (parseFloat(number).toPrecision(precision));
  }

  random( min , max, round = 'floor' )
  {
    let ret = Math.random() * (max-min) + min;

    switch( round ) {
      case 'floor':
        ret = Math.floor( ret );
        break;

      case 'ceil':
        ret = Math.ceil( ret );
        break;
    }

    return ret ;
  }

}

export { BiqHelperNumber };

const biqHelperNumber = new BiqHelperNumber();

export default biqHelperNumber;