import React, { FunctionComponent, useEffect } from 'react';
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
      fetchDataInToeicPage();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
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
  fetchDataInToeicPage: () => dispatch(operationAction.fetchDataInToeicPage()),
  submitToeicScore: (currentScore: any, targetScore: any) =>
    dispatch(toeicAction.submitToeicScore(currentScore, targetScore)),
  updateToeicScore: (targetScore: any) =>
    dispatch(toeicAction.updateToeicScore(targetScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToeicPage);
