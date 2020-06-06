import React, { FunctionComponent } from 'react';
import Routes from '../../routes';

import {
  withStyles,
  createStyles,
  Paper,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import {
  MenuBook as MenuBookIcon,
  Hearing as HearingIcon,
} from '@material-ui/icons';

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

const PracticePageLeft: FunctionComponent<{
  match: any;
  practiceState: any;
}> = ({ match, practiceState }) => {
  return (
    <Paper elevation={1} className='practice-page-container'>
      <div className='flex-left practice-page-item'>
        {match.path === Routes.WRITE_SET_SCREEN ? (
          <React.Fragment>
            <MenuBookIcon color='primary' fontSize='large' />
            <Typography
              color='primary'
              variant='h6'
              style={{ marginLeft: '5px' }}
            >
              Luyện viết
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <HearingIcon color='primary' fontSize='large' />
            <Typography
              color='primary'
              variant='h6'
              style={{ marginLeft: '5px' }}
            >
              Luyện nghe
            </Typography>
          </React.Fragment>
        )}
      </div>
      <div className='practice-page-item'>
        <LinearProgress
          variant='determinate'
          color='primary'
          value={Math.round(
            (100 * practiceState.remain.length) / practiceState.termIds.length
          )}
          classes={{ root: 'progress-panel-bar' }}
        />
        <div className='flex-between'>
          <div>Còn lại</div>
          <div>{practiceState.remain.length}</div>
        </div>
      </div>
      <div className='practice-page-item'>
        <LinearProgress
          variant='determinate'
          color='secondary'
          value={Math.round(
            (100 * practiceState.incorrect.length) /
              practiceState.termIds.length
          )}
          classes={{ root: 'progress-panel-bar' }}
        />
        <div className='flex-between'>
          <div>Sai</div>
          <div>{practiceState.incorrect.length}</div>
        </div>
      </div>
      <div className='practice-page-item'>
        <CustomLinearProgress
          variant='determinate'
          value={Math.round(
            (100 * practiceState.correct.length) / practiceState.termIds.length
          )}
          classes={{
            root: 'progress-panel-bar',
          }}
        />
        <div className='flex-between'>
          <div>Đúng</div>
          <div>{practiceState.correct.length}</div>
        </div>
      </div>
    </Paper>
  );
};

export default PracticePageLeft;
