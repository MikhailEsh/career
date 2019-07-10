import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingProgress = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    <CircularProgress style={{ margin: 'auto' }} />
  </div>
);

export default LoadingProgress;
