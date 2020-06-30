import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import ProgressImage from '../../resources/images/progress.png';
import '../../resources/scss/toeic/progressPanel.scss';

import {
  Typography,
  TextField,
  Button,
  LinearProgress,
} from '@material-ui/core';

const ProgressPanel: FunctionComponent<{
  submitToeicScore: Function;
  updateToeicScore: Function;
  authState: any;
  toeicState: any;
  onError: any;
}> = ({
  submitToeicScore,
  updateToeicScore,
  authState,
  toeicState,
  onError,
}) => {
  const [toeicScore, setToeicScore] = useState({
    currentScore: '',
    targetScore: '',
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

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
      submitToeicScore(
        toeicScore.targetScore,
        toeicScore.currentScore,
        onError
      );
    }
  };

  const handleUpdate = () => {
    if (
      toeicScore.targetScore === '' ||
      Number(toeicScore.targetScore) < 0 ||
      toeicState.data.currentScore > toeicScore.targetScore
    ) {
      setIsError(true);
    } else {
      setIsUpdate(false);
      updateToeicScore(toeicScore.targetScore, onError);
    }
  };

  const renderUpdateTargetPoint = () => {
    if (!authState.toeicId || isUpdate)
      return (
        <div className='toeci-progress-panel-container'>
          {isSubmit ? <div className='assignment-dialog-overlay' /> : null}
          {!authState.toeicId ? (
            <Typography color='primary' variant='h5'>
              Bạn chưa có điểm mục tiêu? Hãy cập nhật ngay!
            </Typography>
          ) : null}
          <div className='toeci-progress-panel-flex'>
            <div>{`Điểm hiện nay của bạn: `}</div>
            <TextField
              id='outlined-number'
              label=''
              type='number'
              name='currentScore'
              variant='outlined'
              value={
                authState.toeicId
                  ? toeicState.data.currentScore
                  : toeicScore.currentScore
              }
              onChange={handleChangeToeicScore}
              onFocus={() => setIsError(false)}
              classes={{ root: 'toeci-progress-panel-input' }}
              inputProps={{
                style: {
                  padding: 5,
                },
              }}
              disabled={authState.toeicId ? true : false}
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
            onClick={isUpdate ? handleUpdate : handleSubmit}
            disabled={isSubmit}
          >
            Cập nhật
          </Button>
          {authState.toeicId ? null : (
            <React.Fragment>
              <div className='toeci-progress-panel-flex'>
                <div>
                  Hoặc bạn cũng có thể dành 20 phút để kiểm tra trình độ hiện
                  tại của mình
                </div>
              </div>
              <Button
                variant='outlined'
                color='primary'
                style={{ marginLeft: '10px' }}
                disabled={isSubmit}
              >
                <Link
                  to='/test/short-test'
                  style={{ textDecoration: 'none', color: '#3f51b5' }}
                >
                  Làm đề rút gọn
                </Link>
              </Button>
            </React.Fragment>
          )}
        </div>
      );
  };

  const renderHaveTargetPoint = () => {
    const { minScore, currentScore, targetScore } = toeicState.data;

    const progress =
      Math.round(((currentScore - minScore) / (targetScore - minScore)) * 100) >
      100
        ? 100
        : Math.round(
            ((currentScore - minScore) / (targetScore - minScore)) * 100
          ) < 0
        ? 0
        : Math.round(
            ((currentScore - minScore) / (targetScore - minScore)) * 100
          );

    return (
      <React.Fragment>
        <div className='progress-panel-contained'>
          <img src={ProgressImage} alt='title' style={{ width: '75px' }} />
          <div className='progress-panel-user-progress-contained'>
            <div className='progress-panel-layout' />
            <div className='progress-panel-bar-wrap'>
              <LinearProgress
                variant='determinate'
                value={progress}
                classes={{ root: 'progress-panel-bar' }}
              />
            </div>
            <div className='progress-panel-min-score'>{minScore}</div>
            <div
              className='progress-panel-current-score'
              style={{
                left: `calc(${progress}% + ${
                  ((-51 - 11) * progress) / 100 + 11
                }px)`,
              }}
            >
              {currentScore}
            </div>
            <div className='progress-panel-target-score'>{targetScore}</div>
            <div className='progress-panel-target-score-text'>
              Mục tiêu hiện tại
            </div>
            <div className='progress-panel-current-score-text'>Cột mốc</div>
          </div>
          <div className='progress-panel-button-group'>
            <Button
              variant='outlined'
              color='primary'
              style={{ marginBottom: '10px' }}
              fullWidth
            >
              <Link
                to='/test/short-test'
                style={{ textDecoration: 'none', color: '#3f51b5' }}
              >
                Luyện đề rút gọn
              </Link>
            </Button>
            <Button variant='contained' color='primary' fullWidth>
              <Link to='test/full-test' className='button-link'>
                Luyện đề hoàn chỉnh
              </Link>
            </Button>
          </div>
        </div>
        <Typography
          color='primary'
          className='progress-panel-update-text'
          onClick={() => setIsUpdate(!isUpdate)}
        >
          Cập nhật điểm mục tiêu
        </Typography>
        {renderUpdateTargetPoint()}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {authState.toeicId ? (
        toeicState.isLoading ? (
          <Loading />
        ) : (
          renderHaveTargetPoint()
        )
      ) : (
        renderUpdateTargetPoint()
      )}
    </React.Fragment>
  );
};

export default ProgressPanel;
