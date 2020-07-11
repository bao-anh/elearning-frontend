import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { handleExtractErrorMessage, isPermittedToAccess } from '../../utils';
import * as learnAction from '../../redux/actions/learn';
import SnackBar from '../../components/common/SnackBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import StudyPageLeft from '../../components/flashcard/StudyPageLeft';
import PermissionDialog from '../../components/flashcard/PermissionDialog';
import StudyPageContent from '../../components/flashcard/StudyPageContent';
import Loading from '../../components/common/Loading';

import { Grid } from '@material-ui/core';

const StudySetPage: FunctionComponent<{
  fetchStudyBySetId: Function;
  fetchAllStudy: Function;
  studyAnswer: Function;
  updateRemember: Function;
  learnState: any;
  authState: any;
  setState: any;
  match: any;
}> = ({
  fetchStudyBySetId,
  fetchAllStudy,
  studyAnswer,
  learnState,
  authState,
  setState,
  match,
}) => {
  const isNotReadyToRender =
    learnState.isLoading ||
    !learnState[match.params.id] ||
    !learnState[match.params.id].study ||
    !Object.keys(learnState[match.params.id].study).length;

  useEffect(() => {
    if (isNotReadyToRender) {
      if (match.params.id === 'all') fetchAllStudy(onError);
      else fetchStudyBySetId(match.params.id, onError);
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
    !learnState[match.params.id].study.termIds ||
    !learnState[match.params.id].study.termIds.length ||
    (match.params.id !== 'all' &&
      !isPermittedToAccess(authState, setState.current))
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
            <StudyPageLeft studyState={learnState[match.params.id].study} />
          </Grid>
          <Grid item xs={9}>
            <StudyPageContent
              studyState={learnState[match.params.id].study}
              studyAnswer={studyAnswer}
              fetchStudyBySetId={fetchStudyBySetId}
              fetchAllStudy={fetchAllStudy}
              onError={onError}
              match={match}
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
  fetchStudyBySetId: (setId: any, onError: any) =>
    dispatch(learnAction.fetchStudyBySetId(setId, onError)),
  fetchAllStudy: (onError: any) => dispatch(learnAction.fetchAllStudy(onError)),
  studyAnswer: (position: any, isCorrect: any, setId: any) =>
    dispatch(learnAction.studyAnswer(position, isCorrect, setId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudySetPage);
