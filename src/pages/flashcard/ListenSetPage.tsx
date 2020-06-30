import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { handleExtractErrorMessage, isPermittedToAccess } from '../../utils';
import * as learnAction from '../../redux/actions/learn';
import SnackBar from '../../components/common/SnackBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import Loading from '../../components/common/Loading';
import PermissionDialog from '../../components/flashcard/PermissionDialog';
import PracticePageLeft from '../../components/flashcard/PracticePageLeft';
import ListenPageContent from '../../components/flashcard/ListenPageContent';

import { Grid } from '@material-ui/core';

const ListenSetPage: FunctionComponent<{
  fetchListenBySetId: Function;
  fetchAllListen: Function;
  updateRemember: Function;
  listenAnswer: Function;
  learnState: any;
  authState: any;
  setState: any;
  match: any;
}> = ({
  fetchListenBySetId,
  fetchAllListen,
  updateRemember,
  listenAnswer,
  learnState,
  authState,
  setState,
  match,
}) => {
  const isNotReadyToRender =
    learnState.isLoading ||
    !learnState[match.params.id] ||
    !learnState[match.params.id].listen ||
    !Object.keys(learnState[match.params.id].listen).length;

  useEffect(() => {
    if (isNotReadyToRender) {
      if (match.params.id === 'all') fetchAllListen(onError);
      else fetchListenBySetId(match.params.id, onError);
    }
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

  if (isNotReadyToRender) return <Loading />;
  else if (
    !isPermittedToAccess(authState, setState.current) ||
    !learnState[match.params.id].listen.termIds ||
    !learnState[match.params.id].listen.termIds.length
  )
    return <PermissionDialog />;
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
              practiceState={learnState[match.params.id].listen}
            />
          </Grid>
          <Grid item xs={9}>
            <ListenPageContent
              match={match}
              listenState={learnState[match.params.id].listen}
              onError={onError}
              fetchListenBySetId={fetchListenBySetId}
              fetchAllListen={fetchAllListen}
              updateRemember={updateRemember}
              listenAnswer={listenAnswer}
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
  fetchListenBySetId: (setId: any, onError: any) =>
    dispatch(learnAction.fetchListenBySetId(setId, onError)),
  fetchAllListen: (onError: any) =>
    dispatch(learnAction.fetchAllListen(onError)),
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
