// Node Modules
import React, { Component } from 'react';

// React Material-UI
import Card from '@material-ui/core/Card';



// Custom Components
import RequirementsStep1 from './RequirementsSteps/RequirementsStep1';
import RequirementsStep2 from './RequirementsSteps/RequirementsStep2';

// Custom Libraries
import { navigationStatus } from './../../../../../lib/utilities';

// Redux
import { connect } from 'react-redux';

// Custom CSS
import './DepositRequirementsCheck.css';

class DepositRequirementsCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step1: {
        status: true, //Todo: Set to false
        active: true
      },
      step2: {
        status: false,
        active: true //Todo: Set to false
      }
    }
  }

  componentDidMount() {
    navigationStatus.next({ navigationState: 'Tambah Saldo' });
    if (this.props.user) {
      this.setStepStatus(this.props.user);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let userState = this.state.user ? this.state.user : null;
    let oldUserState = prevState.user ? prevState.user : null;
    // Checks the user state with previous user state that if
    // something is changed or not
    if (userState && oldUserState) {
      if (userState.profilePicture != oldUserState.profilePicture) {
        this.setStepStatus(userState);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user != prevState.user) {
      return { user: nextProps.user };
    } else {
      return null;
    }
  }


  setStepStatus = (user) => {
    let step1 = { status: false, active: true };
    let step2 = { status: false, active: false };

    if (user.profilePicture) {
      step1.status = true;
      step2.active = true;
    }

    if (user.address && step1.status) {
      step2.status = true;
    }
    this.setState({ step1, step2 });
  }

  render() {
    const { step1, step2 } = this.state;
    return (
      <Card className="custom-card-styles">
        <div className="deposit-requirments-check-container">
          <div className="deposit-requirments-check">
            <div className="deposit-requirments-check__title">Tambah Saldo</div>
            <div className="deposit-inner-container">
              <div className="deposit-inner-container__note">
                Anda belum bisa melakukan penambahan saldo, silahkan penuhi langkah berikut
              </div>
              <div className="requirements-check-list">
                <RequirementsStep1  {...step1} />
                <RequirementsStep2 {...step2} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.user.user
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositRequirementsCheck);