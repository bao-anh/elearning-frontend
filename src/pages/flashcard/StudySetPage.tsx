import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as learnAction from '../../redux/actions/learn';
import SnackBar from '../../components/common/SnackBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import StudyPageLeft from '../../components/flashcard/StudyPageLeft';
import StudyPageContent from '../../components/flashcard/StudyPageContent';
import Loading from '../../components/common/Loading';

import { Grid } from '@material-ui/core';

const StudySetPage: FunctionComponent<{
  fetchStudyBySetId: Function;
  studyAnswer: Function;
  updateRemember: Function;
  learnState: any;
  match: any;
}> = ({ fetchStudyBySetId, studyAnswer, learnState, match }) => {
  const isReadyToRender =
    !learnState[match.params.id] ||
    !learnState[match.params.id].study ||
    !Object.keys(learnState[match.params.id].study).length;

  useEffect(() => {
    if (isReadyToRender) {
      fetchStudyBySetId(match.params.id, onError);
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
            <StudyPageLeft studyState={learnState[match.params.id].study} />
          )}
        </Grid>
        <Grid item xs={9}>
          {learnState.isLoading || isReadyToRender ? (
            <Loading />
          ) : (
            <StudyPageContent
              studyState={learnState[match.params.id].study}
              studyAnswer={studyAnswer}
              fetchStudyBySetId={fetchStudyBySetId}
              onError={onError}
              match={match}
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
  fetchStudyBySetId: (setId: any, onError: any) =>
    dispatch(learnAction.fetchStudyBySetId(setId, onError)),
  studyAnswer: (position: any, isCorrect: any, setId: any) =>
    dispatch(learnAction.studyAnswer(position, isCorrect, setId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudySetPage);
