import React from 'react';

import { Paper } from '@material-ui/core';

const Dummy = () => {
  return (
    <Paper elevation={1} className='custom-block-panel user-info-panel'>
      <div className='custom-block-header-panel'>Thông tin cá nhân</div>
      <div className='custom-block-content-panel'>
        Nothing to show right now
      </div>
    </Paper>
  );
};

export default Dummy;
