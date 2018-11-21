import * as moment from 'moment';

import biqHelperUtils from "./utils";

class BiqHelperMomentClass {

  /**
   * Get day relative to current day, i.e: "Kemarin", "Hari ini"
   * @param p_obj
   * @returns {string}
   */
  getDayRelative( p_obj ){
    let ret = '';
    let params = {
      date_target: null,//Moment date of target to compare
      date_current: null//Moment date of current day
    };

    Object.assign( params, p_obj );

    if ( biqHelperUtils.isNull( params.date_target ) || biqHelperUtils.isNull( params.date_current ) ) {
      return ret;
    }

    let date_yesterday = moment(params.date_current).subtract( 1, 'days' );

    if ( params.date_current.isSame( params.date_target, 'day' ) ) {
      ret = 'Hari ini';
    } else if ( params.date_target.isSame( date_yesterday, 'day' ) ) {
      ret = 'Kemarin';
    } else {
      ret = params.date_target.format('dddd');
    }

    return ret;
  };

  /**
   * Get moment() object relative to server date
   */
  now(){
    return moment();
  }


  countDown( p_obj ) {

    let params = {
      current_dt: moment().valueOf(),//UNIX TIME STAMP
      compared_dt: moment().add(0.1, 'minutes').valueOf(),//UNIX TIME STAMP
      interval: 1000,
      callback_update: null,
      callback_done: null
    };

    Object.assign( params, p_obj );

    let time_diff = params.compared_dt - params.current_dt;
    let duration = moment.duration( time_diff );

    if ( time_diff<=0 ) return;

    let interval = setInterval( ()=> {

      duration = moment.duration(duration - params.interval, 'milliseconds');


      if( typeof params.callback_update === 'function') params.callback_update(duration);

      if ( duration.days() === 0 && duration.hours() === 0 && duration.minutes() === 0 && duration.seconds() === 0 && duration.milliseconds() <= 0 ) {
        clearInterval(interval);
        if( typeof params.callback_done === 'function' ) params.callback_done();
      }

    }, params.interval )

    return {
      stop: stop
    };

    function stop() {
      clearInterval( interval );
    }

  }//countDown()

}

export { BiqHelperMomentClass };

const biqHelperMoment = new BiqHelperMomentClass();
export default biqHelperMoment;