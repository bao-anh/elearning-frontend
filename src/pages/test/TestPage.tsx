import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import { getQuestionOrder, handleExtractErrorMessage } from '../../utils';
import HeaderPanel from '../../components/common/HeaderPanel';
import BreadCrumb from '../../components/common/BreadCrumb';
import Loading from '../../components/common/Loading';
import TestInfo from '../../components/toiec/TestInfo';
import YourActivity from '../../components/common/YourActivity';
import CurrentActivity from '../../components/common/CurrentActivity';
import AssignmentDialog from '../../components/common/AssignmentDialog';
import LeaderBoard from '../../components/toiec/LeaderBoard';
import UserInfoSideBar from '../../components/toiec/UserInfoSideBar';
import ToeicWarningDialog from '../../components/toiec/ToeicWarningDialog';
import SnackBar from '../../components/common/SnackBar';

import { Grid } from '@material-ui/core';

const TestPage: FunctionComponent<{
  fetchDataInTestPage: FunctionComponent;
  match: any;
  testState: any;
  authState: any;
  toeicState: any;
}> = ({ fetchDataInTestPage, match, testState, authState, toeicState }) => {
  useEffect(() => {
    fetchDataInTestPage(match.params.part, onError);
    //eslint-disable-next-line
  }, [match]);

  const [isOpenTest, setOpenTest] = useState(false);

  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: '',
    message: '',
  });

  const onError = (response: any) => {
    let message = handleExtractErrorMessage(response);
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
      <BreadCrumb path={match.path} params={match.params} />
      {authState.isLoading || match.params.part === 'short-test' ? null : (
        <ToeicWarningDialog authState={authState} />
      )}
      <Grid container className='container'>
        {testState.isLoading ? null : (
          <AssignmentDialog
            questionOrderArray={getQuestionOrder(testState.data.questionIds)}
            assignment={{ ...testState.data, isOpen: isOpenTest }}
            match={match}
            handleOpenAssignment={setOpenTest}
          />
        )}
        <Grid item xs={9}>
          <HeaderPanel title='Thông tin bài thi'>
            {testState.isLoading ? (
              <Loading />
            ) : (
              <TestInfo testState={testState} setOpenTest={setOpenTest} />
            )}
          </HeaderPanel>
          <HeaderPanel title='Các bài thi gần đây của bạn'>
            {testState.isLoading ? (
              <Loading />
            ) : (
              <YourActivity
                assignmentState={testState.data}
                authState={authState}
                match={match}
              />
            )}
          </HeaderPanel>
          <HeaderPanel title='Các bài thi gần đây của mọi người'>
            {testState.isLoading ? (
              <Loading />
            ) : (
              <CurrentActivity
                participantIds={testState.data.participantIds}
                questionIds={testState.data.questionIds}
                match={match}
              />
            )}
          </HeaderPanel>
        </Grid>
        <Grid item xs={3}>
          <HeaderPanel
            title={
              isNaN(Number(match.params.part))
                ? 'Bảng xếp hạng tổng'
                : `Bảng xếp hạng Part ${match.params.part}`
            }
          >
            {testState.isLoading ? (
              <Loading />
            ) : (
              <LeaderBoard
                leaderboard={testState.data.leaderboard}
                match={match}
              />
            )}
          </HeaderPanel>
          <HeaderPanel title='Thông tin cá nhân'>
            {testState.isLoading ? (
              <Loading />
            ) : (
              <UserInfoSideBar
                authState={authState}
                testState={testState}
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
    toeicState: state.toeicState,
    testState: state.testState,
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInTestPage: (testType: any, onError: any) =>
    dispatch(operationAction.fetchDataInTestPage(testType, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
