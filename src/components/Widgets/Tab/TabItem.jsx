import React, {Component} from 'react';

class TabItem extends Component{

  render() {
    return (
      <div className={ `widget-tab-item${this.props.is_active ? ' is-active' : ''}` } onClick={this.props._tabItemOnClick}>
        {this.props.label}
      </div>
    );
  }

}

export default TabItem;