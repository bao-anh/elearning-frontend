import React, { useEffect, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { handleExtractErrorMessage } from '../../utils';
import * as operationAction from '../../redux/actions/operation';
import * as commentAction from '../../redux/actions/comment';
import Banner from '../../components/course/Banner';
import BreadCrumb from '../../components/common/BreadCrumb';
import PurchaseWarningDialog from '../../components/course/PurchaseWarningDialog';
import TopicContent from '../../components/course/TopicContent';
import Comment from '../../components/course/Comment';
import HeaderPanel from '../../components/common/HeaderPanel';
import Loading from '../../components/common/Loading';
import UserInfoSideBar from '../../components/course/UserInfoSideBar';
import UtilitySideBar from '../../components/course/UtilitySideBar';
import SnackBar from '../../components/common/SnackBar';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

import { Grid } from '@material-ui/core';

const CoursePage: FunctionComponent<{
  fetchDataInCoursePage: Function;
  addComment: Function;
  deleteComment: Function;
  updateComment: Function;
  likeComment: Function;
  match: any;
  topicState: any;
  authState: any;
}> = ({
  fetchDataInCoursePage,
  addComment,
  deleteComment,
  updateComment,
  likeComment,
  match,
  topicState,
  authState,
}) => {
  useEffect(() => {
    fetchDataInCoursePage(match.params.id, onError);
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
      <Banner topicState={topicState} />
      <BreadCrumb path={match.path} topicState={topicState} />
      <PurchaseWarningDialog
        match={match}
        authState={authState}
        topicState={topicState}
      />
      <Grid container className='container'>
        <Grid item xs={9}>
          <TopicContent path={match.path} topicState={topicState} />
          <HeaderPanel title='Bình luận'>
            {topicState.isLoadingLargeTopic ? (
              <Loading />
            ) : (
              <Comment
                authState={authState}
                match={match}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                likeComment={likeComment}
                content={topicState.largeTopic.commentIds}
              />
            )}
          </HeaderPanel>
        </Grid>
        <Grid item xs={3}>
          <UserInfoSideBar authState={authState} topicState={topicState} />
          <UtilitySideBar topicState={topicState} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    courseState: state.courseState,
    topicState: state.topicState,
    lessonState: state.lessonState,
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInCoursePage: (courseId: number, onError: any) =>
    dispatch(operationAction.fetchDataInCoursePage(courseId, onError)),
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

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
