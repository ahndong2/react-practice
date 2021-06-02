import React from 'react';

const TabPanel = ({ id = '', children }) => {
  return (
    <div id={id} className="panel-comm" role="tabpanel">
      {children}
    </div>
  );
};

export default TabPanel;
