import React, { FunctionComponent, useState } from 'react';
import '../../resources/scss/toeic/progressPanel.scss';

import { Typography, TextField, Button } from '@material-ui/core';

const ProgressPanel: FunctionComponent<{
  submitToeicScore: Function;
  authState: any;
}> = ({ submitToeicScore, authState }) => {
  const [toeicScore, setToeicScore] = useState({
    currentScore: '',
    targetScore: '',
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChangeToeicScore = (e: any) => {
    if (Number(e.target.value) <= 990) {
      setToeicScore({ ...toeicScore, [e.target.name]: Number(e.target.value) });
    }
  };

  const handleSubmit = () => {
    if (
      toeicScore.currentScore === '' ||
      toeicScore.targetScore === '' ||
      Number(toeicScore.currentScore) < 0 ||
      Number(toeicScore.targetScore) < 0 ||
      toeicScore.currentScore > toeicScore.targetScore
    ) {
      setIsError(true);
    } else {
      setIsSubmit(true);
      submitToeicScore(toeicScore.targetScore, toeicScore.currentScore);
    }
  };

  const renderDoesntHaveTargetPoint = () => {
    return (
      <div className='toeci-progress-panel-container'>
        {isSubmit ? <div className='assignment-dialog-overlay' /> : null}
        <Typography color='primary' variant='h5'>
          Bạn chưa có điểm mục tiêu? Hãy cập nhật ngay!
        </Typography>
        <div className='toeci-progress-panel-flex'>
          <div>{`Điểm hiện nay của bạn: `}</div>
          <TextField
            id='outlined-number'
            label=''
            type='number'
            name='currentScore'
            variant='outlined'
            value={toeicScore.currentScore}
            onChange={handleChangeToeicScore}
            onFocus={() => setIsError(false)}
            classes={{ root: 'toeci-progress-panel-input' }}
            inputProps={{
              style: {
                padding: 5,
              },
            }}
          />
        </div>
        <div className='toeci-progress-panel-flex'>
          <div>{`Điểm mục tiêu của bạn: `}</div>
          <TextField
            label=''
            type='number'
            name='targetScore'
            variant='outlined'
            value={toeicScore.targetScore}
            onChange={handleChangeToeicScore}
            onFocus={() => setIsError(false)}
            classes={{ root: 'toeci-progress-panel-input' }}
            inputProps={{
              style: {
                padding: 5,
              },
            }}
          />
        </div>
        {isError ? (
          <Typography
            color='secondary'
            variant='body2'
            style={{ marginBottom: '10px' }}
          >
            Điểm mục tiêu và điểm hiện nay không hợp lệ
          </Typography>
        ) : null}
        <Button
          color='primary'
          variant='contained'
          onClick={handleSubmit}
          disabled={isSubmit}
        >
          Cập nhật
        </Button>
      </div>
    );
  };

  return (
    <React.Fragment>
      {authState.toeicId ? (
        <div>Bạn đã có điểm toeic</div>
      ) : (
        renderDoesntHaveTargetPoint()
      )}
    </React.Fragment>
  );
};

export default ProgressPanel;
