import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as learnAction from '../../redux/actions/learn';
import SnackBar from '../../components/common/SnackBar';
import PracticePageLeft from '../../components/flashcard/PracticePageLeft';
import WritePageContent from '../../components/flashcard/WritePageContent';
import Loading from '../../components/common/Loading';
import BreadCrumb from '../../components/common/BreadCrumb';

import { Grid } from '@material-ui/core';

const WriteSetPage: FunctionComponent<{
  fetchWriteBySetId: Function;
  writeAnswer: Function;
  updateRemember: Function;
  learnState: any;
  match: any;
}> = ({
  fetchWriteBySetId,
  writeAnswer,
  updateRemember,
  learnState,
  match,
}) => {
  const isReadyToRender =
    !learnState[match.params.id] ||
    !learnState[match.params.id].write ||
    !Object.keys(learnState[match.params.id].write).length;

  useEffect(() => {
    if (isReadyToRender) {
      fetchWriteBySetId(match.params.id, onError);
    }
    //eslint-disable-next-line
  }, [match]);

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
      <BreadCrumb path={match.path} params={match.params} />
      <Grid container className='container'>
        <Grid item xs={3}>
          {learnState.isLoading || isReadyToRender ? (
            <Loading />
          ) : (
            <PracticePageLeft
              match={match}
              practiceState={learnState[match.params.id].write}
            />
          )}
        </Grid>
        <Grid item xs={9}>
          {learnState.isLoading || isReadyToRender ? (
            <Loading />
          ) : (
            <WritePageContent
              writeState={learnState[match.params.id].write}
              writeAnswer={writeAnswer}
              match={match}
              onError={onError}
              fetchWriteBySetId={fetchWriteBySetId}
              updateRemember={updateRemember}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    learnState: state.learnState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchWriteBySetId: (setId: any, onError: any) =>
    dispatch(learnAction.fetchWriteBySetId(setId, onError)),
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
