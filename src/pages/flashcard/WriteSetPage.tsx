import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { handleExtractErrorMessage } from '../../utils';
import * as learnAction from '../../redux/actions/learn';
import SnackBar from '../../components/common/SnackBar';
import PracticePageLeft from '../../components/flashcard/PracticePageLeft';
import WritePageContent from '../../components/flashcard/WritePageContent';
import PermissionDialog from '../../components/flashcard/PermissionDialog';
import Loading from '../../components/common/Loading';
import BreadCrumb from '../../components/common/BreadCrumb';

import { Grid } from '@material-ui/core';

const WriteSetPage: FunctionComponent<{
  fetchWriteBySetId: Function;
  fetchAllWrite: Function;
  writeAnswer: Function;
  updateRemember: Function;
  learnState: any;
  authState: any;
  setState: any;
  match: any;
}> = ({
  fetchWriteBySetId,
  fetchAllWrite,
  writeAnswer,
  updateRemember,
  setState,
  authState,
  learnState,
  match,
}) => {
  const isNotReadyToRender =
    learnState.isLoading ||
    !learnState[match.params.id] ||
    !learnState[match.params.id].write ||
    !Object.keys(learnState[match.params.id].write).length;

  useEffect(() => {
    if (isNotReadyToRender) {
      if (match.params.id === 'all') fetchAllWrite(onError);
      else fetchWriteBySetId(match.params.id, onError);
    }
    //eslint-disable-next-line
  }, [match]);

  const isPermitted = authState.setIds.includes(setState.current._id);

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

  if (isNotReadyToRender) return <Loading />;
  if (!isPermitted) return <PermissionDialog />;
  else
    return (
      <React.Fragment>
        {renderSnackBar()}
        <BreadCrumb
          path={match.path}
          params={match.params}
          setState={setState}
        />
        <Grid container className='container'>
          <Grid item xs={3}>
            <PracticePageLeft
              match={match}
              practiceState={learnState[match.params.id].write}
            />
          </Grid>
          <Grid item xs={9}>
            <WritePageContent
              writeState={learnState[match.params.id].write}
              writeAnswer={writeAnswer}
              match={match}
              onError={onError}
              fetchWriteBySetId={fetchWriteBySetId}
              fetchAllWrite={fetchAllWrite}
              updateRemember={updateRemember}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    setState: state.setState,
    learnState: state.learnState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchWriteBySetId: (setId: any, onError: any) =>
    dispatch(learnAction.fetchWriteBySetId(setId, onError)),
  fetchAllWrite: (onError: any) => dispatch(learnAction.fetchAllWrite(onError)),
  writeAnswer: (isCorrect: any, setId: any) =>
    dispatch(learnAction.writeAnswer(isCorrect, setId)),
  updateRemember: (
    setId: any,
    practiceType: any,
    onSuccess: any,
    onError: any
  ) =>
    dispatch(
      learnAction.updateRemember(setId, practiceType, onSuccess, onError)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(WriteSetPage);
