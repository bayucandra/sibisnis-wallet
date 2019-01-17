class PhoneProvider {

  constructor() {

    this.countries = [
      { country_code: '62', iso_code: 'ID', name: 'Indonesia', flag_icon: 'merah-putih.svg', default: true },
      { country_code: '61', iso_code: 'MY', name: 'Malaysia', flag_icon: 'merah-putih.svg' }
    ];

    this.country_default = this.countries.filter( function(el){
      return !!el.default;
    } );

    this.operatorPrefixGen();

  }

  operators = {
    '62' : [
      {
        name: 'telkomsel', icon: 'client-telkomsel.svg',
        products: [
          { name: 'simpati', icon: 'support-simpati.svg', prefixes: [ '0821', '0822' ] },
          { name: 'as', icon: 'kartu-as.svg', prefixes: [ '0823','0852', '0853', '0851' ] }
        ]
      },
      {
        name: 'indosat', icon: 'logo-indosat.svg',
        products: [
          { name: 'mentari', icon: 'logo-indosat.svg', prefixes: [ '0815', '0816', '0858' ] },
          { name: 'im3', icon: 'logo-indosat.svg', prefixes: [ '0856', '0857' ] },
          { name: 'matrix', icon: 'logo-indosat.svg', prefixes: [ '0855' ] },
        ]
      },
      {
        name: 'xl', icon: 'logo-xl.svg',
        products: [
          { name: 'xl', icon: 'logo-xl.svg', prefixes : [ '0817', '0818', '0819', '0859', '0877', '0878' ] }
        ]
      },
      {
        name: 'tri', icon: 'logo-three.svg',
        products: [
          { name: 'tri', icon: 'logo-three.svg', prefixes : [ '0895', '0896', '0897', '0898', '0899' ] }
        ]
      },
      {
        name: 'smart', icon: 'logo-smartfren.svg',
        products: [
          { name: 'smart', icon: 'logo-smartfren.svg', prefixes : [ '0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889' ] }
        ]
      },
      {
        name: 'axis', icon: 'logo-axis.svg',
        products: [
          { name: 'axis', icon: 'logo-axis.svg', prefixes : [ '0838', '0831', '0832', '0833' ] }
        ]
      }
    ]
  };

  countryGetRecord( p_obj ) {
    let params = { key: 'country_code', val: '' };

    Object.assign( params, p_obj );

    for( let i=0; i<this.countries.length; i++ ) {
      if ( this.countries[i][ params.key ] === params.val ) {
        return this.countries[i];
      }
    }

    return [];
  }

  countryIsExist( p_obj ) {

    let params = { key: 'country_code', val: '' };

    Object.assign( params, p_obj );

    for( let i=0; i<this.countries.length; i++ ) {
      if ( this.countries[i][ params.key ] === params.val ) {
        return true;
      }
    }

    return false;

  }

  operator_prefixes_all_simple = {
    '62': [
      '0811', '0812', '0813', '0814', '0815',
      '0816', '0817', '0818', '0819', '0821',
      '0822', '0823', '0827', '0828', '0831',
      '0832', '0833', '0838', '0851', '0852',
      '0853', '0855', '0856', '0857', '0858',
      '0859', '0868', '0877', '0878', '0881',
      '0882', '0883', '0884', '0885', '0886',
      '0887', '0888', '0889', '0895', '0896',
      '0897', '0898', '0899' ]
  };

  operators_prefixes = {};

  operatorPrefixGen() {
    for ( let key in this.operators ) {
      let dst_prefixes = {};

      let src_operators = this.operators[key];
      for (let i = 0; i < src_operators.length; i++) {
        let src_products = src_operators[ i ].products;
        for (let i2 = 0; i2 < src_products.length; i2++) {
          let src_prefixes = src_products[ i2 ].prefixes;
          for ( let i3 =0; i3 < src_prefixes.length; i3++ ) {
            if (dst_prefixes.hasOwnProperty( src_prefixes[i3] )) {
              console.error( 'widgetPhoneInputS => Error:: duplicate phone prefix for: ' + src_prefixes[i3] );
              continue;
            }
            dst_prefixes[ src_prefixes[i3] ] = {
              operator_name : src_operators[i].name,
              product_name : src_products[i2].name,
              icon: src_products[i2].icon
            };
          }
        }
      }
      this.operators_prefixes[key] = dst_prefixes;
    }
  }

  operatorPrefixGet( p_obj ){
    let params = { country_code: '', prefix: '' };

    Object.assign( params, p_obj );

    let prefixes = this.operators_prefixes[ params.country_code ];

    for ( let i = 0; i<prefixes.length; i++ ) {

    }

  };

}

const phoneProvider = new PhoneProvider();

export default phoneProvider;