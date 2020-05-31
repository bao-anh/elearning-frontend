import React, { useEffect, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import { getQuestionOrder } from '../../utils';
import HeaderPanel from '../../components/common/HeaderPanel';
import Loading from '../../components/common/Loading';
import AssignmentInfo from '../../components/common/AssignmentInfo';
import TopicSideBar from '../../components/course/TopicSideBar';
import PurchaseWarningDialog from '../../components/course/PurchaseWarningDialog';
import UserInfoSideBar from '../../components/course/UserInfoSideBar';
import UtilitySideBar from '../../components/course/UtilitySideBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import AssignmentDialog from '../../components/common/AssignmentDialog';
import CurrentActivity from '../../components/common/CurrentActivity';
import YourActivity from '../../components/common/YourActivity';
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
      <PurchaseWarningDialog
        match={match}
        authState={authState}
        assignmentState={assignmentState}
      />
      <Grid container className='container'>
        {assignmentState.isLoading ? null : (
          <AssignmentDialog
            questionOrderArray={getQuestionOrder(
              assignmentState.data.questionIds
            )}
            assignment={{ ...assignmentState.data, isOpen: openAssignment }}
            match={match}
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
                assignmentState={assignmentState.data}
                authState={authState}
                match={match}
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
                match={match}
              />
            )}
          </HeaderPanel>
        </Grid>
        <Grid item xs={3}>
          <TopicSideBar
            path={match.path}
            currentId={match.params.id}
            topicState={topicState}
          />
          <UserInfoSideBar authState={authState} topicState={topicState} />
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
