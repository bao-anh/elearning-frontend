import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as learnAction from '../../redux/actions/learn';
import SnackBar from '../../components/common/SnackBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import Loading from '../../components/common/Loading';
import PracticePageLeft from '../../components/flashcard/PracticePageLeft';
import ListenPageContent from '../../components/flashcard/ListenPageContent';

import { Grid } from '@material-ui/core';

const ListenSetPage: FunctionComponent<{
  fetchListenBySetId: Function;
  updateRemember: Function;
  listenAnswer: Function;
  learnState: any;
  setState: any;
  match: any;
}> = ({
  fetchListenBySetId,
  updateRemember,
  listenAnswer,
  learnState,
  setState,
  match,
}) => {
  const isReadyToRender =
    !learnState[match.params.id] ||
    !learnState[match.params.id].listen ||
    !Object.keys(learnState[match.params.id].listen).length;

  useEffect(() => {
    if (isReadyToRender) {
      fetchListenBySetId(match.params.id, onError);
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
      {learnState.isLoading || isReadyToRender ? null : (
        <BreadCrumb
          path={match.path}
          params={match.params}
          setState={setState}
        />
      )}
      <Grid container className='container'>
        <Grid item xs={3}>
          {learnState.isLoading || isReadyToRender ? (
            <Loading />
          ) : (
            <PracticePageLeft
              match={match}
              practiceState={learnState[match.params.id].listen}
            />
          )}
        </Grid>
        <Grid item xs={9}>
          {learnState.isLoading || isReadyToRender ? (
            <Loading />
          ) : (
            <ListenPageContent
              match={match}
              listenState={learnState[match.params.id].listen}
              onError={onError}
              fetchListenBySetId={fetchListenBySetId}
              updateRemember={updateRemember}
              listenAnswer={listenAnswer}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    setState: state.setState,
    learnState: state.learnState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchListenBySetId: (setId: any, onError: any) =>
    dispatch(learnAction.fetchListenBySetId(setId, onError)),
  listenAnswer: (isCorrect: any, setId: any) =>
    dispatch(learnAction.listenAnswer(isCorrect, setId)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ListenSetPage);
