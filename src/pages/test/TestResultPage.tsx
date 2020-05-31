import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import { getQuestionOrder } from '../../utils';
import ToeicWarningDialog from '../../components/toiec/ToeicWarningDialog';
import AssignmentDialogResult from '../../components/common/AssignmentDialogResult';
import Loading from '../../components/common/Loading';

const TestResultPage: FunctionComponent<{
  fetchDataInTestResultPage: Function;
  match: any;
  testState: any;
  authState: any;
}> = ({ fetchDataInTestResultPage, match, testState, authState }) => {
  useEffect(() => {
    fetchDataInTestResultPage(match.params.id);
    //eslint-disable-next-line
  }, [match]);

  return (
    <React.Fragment>
      {authState.isLoading ? null : (
        <ToeicWarningDialog authState={authState} />
      )}
      {testState.isLoading ? (
        <Loading />
      ) : (
        <AssignmentDialogResult
          name={testState.data.participantIds[0].testId.name}
          duration={testState.data.participantIds[0].testId.duration}
          openResult={0}
          questionOrderArray={getQuestionOrder(
            testState.data.participantIds[0].testId.questionIds
          )}
          questionIds={testState.data.participantIds[0].testId.questionIds}
          participantIds={testState.data.participantIds}
          handleOpenResult={() => {}}
          match={match}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    testState: state.testState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInTestResultPage: (participantId: any) =>
    dispatch(operationAction.fetchDataInTestResultPage(participantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestResultPage);
