import React, {Component} from 'react';
import { connect } from 'react-redux';

class Deposit extends Component {

  constructor( props ) {
    super(props);

  }

  render() {
    const user_photo = this.props.user.photo;

    return (
      <div>
        {user_photo}
      </div>
    )
  }//render()

}//class Deposit

const mapStateToProps = store => {
  return {
    user: store.user
  }
};

export default connect(null)(Deposit);