import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import { getQuestionOrder, handleExtractErrorMessage } from '../../utils';
import ToeicWarningDialog from '../../components/toiec/ToeicWarningDialog';
import AssignmentDialogResult from '../../components/common/AssignmentDialogResult';
import Loading from '../../components/common/Loading';
import SnackBar from '../../components/common/SnackBar';

const TestResultPage: FunctionComponent<{
  fetchDataInTestResultPage: Function;
  match: any;
  testState: any;
  authState: any;
}> = ({ fetchDataInTestResultPage, match, testState, authState }) => {
  useEffect(() => {
    fetchDataInTestResultPage(match.params.id, onError);
    //eslint-disable-next-line
  }, [match]);

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
  fetchDataInTestResultPage: (participantId: any, onError: any) =>
    dispatch(operationAction.fetchDataInTestResultPage(participantId, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TestResultPage);
