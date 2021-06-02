import React, { Component } from 'react';

class PanelHead extends Component {
  render() {
    return (
        <div className="head-panel">
            <h3>{this.props.children}</h3>
        </div>
    );
  }
}

export default PanelHead;




