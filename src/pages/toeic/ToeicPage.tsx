import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import * as toeicAction from '../../redux/actions/toeic';
import HeaderPanel from '../../components/common/HeaderPanel';
import ProgressPanel from '../../components/toiec/ProgressPanel';
import BreadCrumb from '../../components/common/BreadCrumb';
import ToeicContent from '../../components/toiec/ToeicContent';
import Loading from '../../components/common/Loading';
import LeaderBoard from '../../components/toiec/LeaderBoard';
import UserInfoSideBar from '../../components/toiec/UserInfoSideBar';
import SnackBar from '../../components/common/SnackBar';

import { Grid } from '@material-ui/core';

const ToeicPage: FunctionComponent<{
  fetchDataInToeicPage: Function;
  submitToeicScore: Function;
  updateToeicScore: Function;
  authState: any;
  toeicState: any;
  scaleState: any;
  match: any;
}> = ({
  fetchDataInToeicPage,
  submitToeicScore,
  updateToeicScore,
  authState,
  scaleState,
  toeicState,
  match,
}) => {
  useEffect(() => {
    if (authState.toeicId) {
      fetchDataInToeicPage(onError);
    }
    //eslint-disable-next-line
  }, []);

  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: '',
    message: '',
  });

  const onError = (data: any) => {
    let message = '';
    if (data.errors) {
      data.errors.forEach((error: any) => {
        message += `${error.msg}. `;
      });
    } else message += data.msg;
    setSnackBar({
      isOpen: true,
      severity: 'error',
      message,
    });
  };

  const renderSnackBar = () => {
    if (snackBar.isOpen) {
      return <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />;
    } else return null;
  };

  return (
    <React.Fragment>
      {renderSnackBar()}
      <BreadCrumb path={match.path} />
      <Grid container className='container'>
        <Grid item xs={9}>
          <HeaderPanel
            title='Tiến độ luyện tập'
            style={{ margin: '0 10px 0 10px' }}
          >
            <ProgressPanel
              authState={authState}
              toeicState={toeicState}
              submitToeicScore={submitToeicScore}
              updateToeicScore={updateToeicScore}
              onError={onError}
            />
          </HeaderPanel>
          {authState.toeicId ? (
            <HeaderPanel
              title='Luyện tập theo từng phần'
              style={{ margin: '0 10px 0 10px' }}
            >
              {toeicState.isLoading ? (
                <Loading />
              ) : (
                <ToeicContent
                  toeicState={toeicState}
                  scaleState={scaleState.data}
                />
              )}
            </HeaderPanel>
          ) : null}
        </Grid>
        <Grid item xs={3}>
          {authState.toeicId ? (
            <React.Fragment>
              <HeaderPanel title='Bảng xếp hạng tổng'>
                {toeicState.isLoading ? (
                  <Loading />
                ) : (
                  <LeaderBoard
                    leaderboard={toeicState.data.leaderboard}
                    match={match}
                  />
                )}
              </HeaderPanel>
              <HeaderPanel title='Thông tin cá nhân'>
                {toeicState.isLoading ? (
                  <Loading />
                ) : (
                  <UserInfoSideBar
                    authState={authState}
                    toeicState={toeicState}
                    match={match}
                  />
                )}
              </HeaderPanel>
            </React.Fragment>
          ) : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    toeicState: state.toeicState,
    scaleState: state.scaleState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInToeicPage: (onError: any) =>
    dispatch(operationAction.fetchDataInToeicPage(onError)),
  submitToeicScore: (currentScore: any, targetScore: any, onError: any) =>
    dispatch(toeicAction.submitToeicScore(targetScore, onError, currentScore)),
  updateToeicScore: (targetScore: any, onError: any) =>
    dispatch(toeicAction.updateToeicScore(targetScore, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToeicPage);
