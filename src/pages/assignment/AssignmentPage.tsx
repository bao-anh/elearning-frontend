import React, { useEffect, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import * as commentAction from '../../redux/actions/comment';
import { getQuestionOrder, handleExtractErrorMessage } from '../../utils';
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
import SnackBar from '../../components/common/SnackBar';
import Comment from '../../components/course/Comment';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

import { Grid } from '@material-ui/core';

const AssignmentPage: FunctionComponent<{
  fetchDataInAssignmentPage: Function;
  addComment: Function;
  updateComment: Function;
  deleteComment: Function;
  likeComment: Function;
  match: any;
  assignmentState: any;
  courseState: any;
  topicState: any;
  lessonState: any;
  authState: any;
}> = ({
  fetchDataInAssignmentPage,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  match,
  assignmentState,
  topicState,
  lessonState,
  courseState,
  authState,
}) => {
  useEffect(() => {
    fetchDataInAssignmentPage(match.params.id, onError);
    //eslint-disable-next-line
  }, [match]);

  const [openAssignment, setOpenAssignment] = useState(false);
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
          <HeaderPanel title='Bình luận'>
            {assignmentState.isLoading ? (
              <Loading />
            ) : (
              <Comment
                authState={authState}
                match={match}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                likeComment={likeComment}
                content={assignmentState.data.commentIds}
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
  fetchDataInAssignmentPage: (assignmentId: number, onError: any) =>
    dispatch(operationAction.fetchDataInAssignmentPage(assignmentId, onError)),
  addComment: (
    parentId: any,
    parentCommentId: any,
    position: any,
    message: any,
    onSuccess: any
  ) =>
    dispatch(
      commentAction.addComment(
        parentId,
        parentCommentId,
        position,
        message,
        onSuccess
      )
    ),
  deleteComment: (
    commentId: any,
    parentId: any,
    parentCommentId: any,
    position: any,
    onSuccess: any
  ) =>
    dispatch(
      commentAction.deleteComment(
        commentId,
        parentId,
        parentCommentId,
        position,
        onSuccess
      )
    ),
  updateComment: (
    commentId: any,
    parentId: any,
    position: any,
    message: any,
    onSuccess: any
  ) =>
    dispatch(
      commentAction.updateComment(
        commentId,
        parentId,
        position,
        message,
        onSuccess
      )
    ),
  likeComment: (
    userId: any,
    item: any,
    parent: any,
    isLike: any,
    position: any,
    onSuccess: any
  ) =>
    dispatch(
      commentAction.likeComment(
        userId,
        item,
        parent,
        isLike,
        position,
        onSuccess
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentPage);
