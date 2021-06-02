import React, { Component } from 'react';

class PanelBody extends Component {
  render() {
    return (
        <div className="body-panel">
            {this.props.children}
        </div>
    );
  }
}

export default PanelBody;




