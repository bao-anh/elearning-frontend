import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => {
  return (
    <div style={{ minHeight: '100px' }}>
      <CircularProgress
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          margin: 'auto',
        }}
      />
    </div>
  );
};

export default Loading;
