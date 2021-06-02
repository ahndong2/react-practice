import React, { Component } from 'react';

class PanelFoot extends Component {
  render() {
    return (
        <div className="foot-panel">
            {this.props.children}
        </div>
    );
  }
}

export default PanelFoot;




