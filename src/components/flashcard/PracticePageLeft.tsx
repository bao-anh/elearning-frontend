import React, { FunctionComponent } from 'react';

import {
  withStyles,
  createStyles,
  Paper,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { MenuBook as MenuBookIcon } from '@material-ui/icons';

const CustomLinearProgress = withStyles((theme: any) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: '#c8e6c9',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#4caf50',
    },
  })
)(LinearProgress);

const PracticePageLeft: FunctionComponent<{ writeState: any }> = ({
  writeState,
}) => {
  return (
    <Paper elevation={1} className='practice-page-container'>
      <div className='flex-left practice-page-item'>
        <MenuBookIcon color='primary' fontSize='large' />
        <Typography color='primary' variant='h6' style={{ marginLeft: '5px' }}>
          Luyện viết
        </Typography>
      </div>
      <div className='practice-page-item'>
        <LinearProgress
          variant='determinate'
          color='primary'
          value={Math.round(
            (100 * writeState.remain.length) / writeState.termIds.length
          )}
          classes={{ root: 'progress-panel-bar' }}
        />
        <div className='flex-between'>
          <div>Còn lại</div>
          <div>{writeState.remain.length}</div>
        </div>
      </div>
      <div className='practice-page-item'>
        <LinearProgress
          variant='determinate'
          color='secondary'
          value={Math.round(
            (100 * writeState.incorrect.length) / writeState.termIds.length
          )}
          classes={{ root: 'progress-panel-bar' }}
        />
        <div className='flex-between'>
          <div>Sai</div>
          <div>{writeState.incorrect.length}</div>
        </div>
      </div>
      <div className='practice-page-item'>
        <CustomLinearProgress
          variant='determinate'
          value={Math.round(
            (100 * writeState.correct.length) / writeState.termIds.length
          )}
          classes={{
            root: 'progress-panel-bar',
          }}
        />
        <div className='flex-between'>
          <div>Đúng</div>
          <div>{writeState.correct.length}</div>
        </div>
      </div>
    </Paper>
  );
};

export default PracticePageLeft;
