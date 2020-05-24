import React, { useEffect, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import HeaderPanel from '../../components/HeaderPanel';
import Loading from '../../components/Loading';
import AssignmentInfo from '../../components/AssignmentInfo';
import Comment from '../../components/Comment';
import TopicSideBar from '../../components/TopicSideBar';
import UserInfoSideBar from '../../components/UserInfoSideBar';
import UtilitySideBar from '../../components/UtilitySideBar';
import BreadCrumb from '../../components/BreadCrumb';
import AssignmentDialog from '../../components/AssignmentDialog';
import CurrentActivity from '../../components/CurrentActivity';
import YourActivity from '../../components/YourActivity';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

import { Grid } from '@material-ui/core';

const AssignmentPage: FunctionComponent<{
  fetchDataInAssignmentPage: Function;
  match: any;
  assignmentState: any;
  courseState: any;
  topicState: any;
  lessonState: any;
  authState: any;
}> = ({
  fetchDataInAssignmentPage,
  match,
  assignmentState,
  topicState,
  lessonState,
  courseState,
  authState,
}) => {
  useEffect(() => {
    fetchDataInAssignmentPage(match.params.id);
    //eslint-disable-next-line
  }, [match]);

  const [openAssignment, setOpenAssignment] = useState(false);

  return (
    <React.Fragment>
      <BreadCrumb
        path={match.path}
        courseState={courseState}
        topicState={topicState}
        assignmentState={assignmentState}
      />
      <Grid container className='container'>
        {assignmentState.isLoading ? null : (
          <AssignmentDialog
            assignment={{ ...assignmentState.data, isOpen: openAssignment }}
            path={match.path}
            handleOpenAssignment={setOpenAssignment}
          />
        )}
        <Grid item xs={9}>
          <HeaderPanel title='Thông tin chung'>
            {assignmentState.isLoading ? (
              <Loading />
            ) : (
              <AssignmentInfo setOpenAssignment={setOpenAssignment} />
            )}
          </HeaderPanel>
          <HeaderPanel title='Các bài làm gần đây của bạn'>
            {assignmentState.isLoading ? (
              <Loading />
            ) : (
              <YourActivity
                assignmentState={assignmentState}
                authState={authState}
              />
            )}
          </HeaderPanel>
          <HeaderPanel title='Các bài làm gần đây của mọi người'>
            {assignmentState.isLoading ? (
              <Loading />
            ) : (
              <CurrentActivity
                participantIds={assignmentState.data.participantIds}
                questionIds={assignmentState.data.questionIds}
              />
            )}
          </HeaderPanel>
          <Comment />
        </Grid>
        <Grid item xs={3}>
          <TopicSideBar
            path={match.path}
            currentId={match.params.id}
            topicState={topicState}
          />
          <UserInfoSideBar lessonState={lessonState} />
          <UtilitySideBar topicState={topicState} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    assignmentState: state.assignmentState,
    courseState: state.courseState,
    topicState: state.topicState,
    lessonState: state.lessonState,
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInAssignmentPage: (assignmentId: number) =>
    dispatch(operationAction.fetchDataInAssignmentPage(assignmentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentPage);
