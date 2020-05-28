import React, { FunctionComponent } from 'react';

import { Paper } from '@material-ui/core';

const HeaderPanel: FunctionComponent<{
  children: any;
  title: any;
  style?: any;
}> = ({ children, title, style }) => {
  return (
    <Paper elevation={1} className='main-block-panel user-info-panel'>
      <div className='custom-block-header-panel'>{title}</div>
      <div className='custom-block-content-panel' style={style}>
        {children}
      </div>
    </Paper>
  );
};

export default HeaderPanel;
