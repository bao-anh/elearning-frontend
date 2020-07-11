import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { handleExtractErrorMessage } from '../../utils';
import * as operationAction from '../../redux/actions/operation';
import * as commentAction from '../../redux/actions/comment';
import PurchaseWarningDialog from '../../components/course/PurchaseWarningDialog';
import VideoDialog from './VideoDialog';
import Loading from '../../components/common/Loading';
import Reference from '../../components/course/Reference';
import TopicContent from '../../components/course/TopicContent';
import TopicSideBar from '../../components/course/TopicSideBar';
import UserInfoSideBar from '../../components/course/UserInfoSideBar';
import UtilitySideBar from '../../components/course/UtilitySideBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import SnackBar from '../../components/common/SnackBar';
import HeaderPanel from '../../components/common/HeaderPanel';
import Comment from '../../components/course/Comment';
import '../../resources/scss/lesson.scss';

import { Paper, Grid } from '@material-ui/core';

const LessonPage: FunctionComponent<{
  fetchDataInLessonPage: Function;
  addComment: Function;
  updateComment: Function;
  deleteComment: Function;
  likeComment: Function;
  match: any;
  topicState: any;
  lessonState: any;
  courseState: any;
  authState: any;
}> = ({
  fetchDataInLessonPage,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  match,
  topicState,
  lessonState,
  courseState,
  authState,
}) => {
  useEffect(() => {
    fetchDataInLessonPage(match.params.id, onError);
    //eslint-disable-next-line
  }, [match]);

  const [isOpenVideo, setOpenVideo] = useState(false);

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
        lessonState={lessonState}
      />
      <PurchaseWarningDialog
        match={match}
        authState={authState}
        lessonState={lessonState}
      />
      <Grid container className='container'>
        {lessonState.isLoading ? (
          <Loading />
        ) : (
          <VideoDialog
            isOpenVideo={isOpenVideo}
            setOpenVideo={setOpenVideo}
            authState={authState}
            lessonState={lessonState}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            likeComment={likeComment}
            content={lessonState.data.commentIds}
            match={match}
          />
        )}

        <Grid item xs={9}>
          <Paper
            elevation={1}
            className='main-block-panel topic-content-find-media-element'
          >
            <div className='main-block-header-panel'>
              {lessonState.isLoading ? 'Mô tả' : lessonState.data.name}
            </div>
            {lessonState.isLoading ? (
              <Loading />
            ) : (
              <React.Fragment>
                <div className='video-panel'>
                  <img
                    className='video-panel-img'
                    alt='video img'
                    src='https://storage.googleapis.com/comaiphuong-edu-media/images/images_default_videojs.jpg'
                    src-video-js='https://ngonngu.vncdn.vn/output/toeic450/part1/part1bai1304499552.mp4/1/2/1119/304499552.m3u8'
                    onClick={() => setOpenVideo(true)}
                  />
                </div>
              </React.Fragment>
            )}
          </Paper>
          <TopicContent
            topicState={topicState}
            lessonState={lessonState}
            path={match.path}
          />
          <Reference lessonState={lessonState} />
          <HeaderPanel title='Bình luận'>
            {lessonState.isLoading ? (
              <Loading />
            ) : (
              <Comment
                authState={authState}
                match={match}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                likeComment={likeComment}
                content={lessonState.data.commentIds}
              />
            )}
          </HeaderPanel>
        </Grid>
        <Grid item xs={3}>
          <TopicSideBar
            topicState={topicState}
            path={match.path}
            currentId={match.params.id}
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
    lessonState: state.lessonState,
    topicState: state.topicState,
    courseState: state.courseState,
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInLessonPage: (lessonId: number, onError: any) =>
    dispatch(operationAction.fetchDataInLessonPage(lessonId, onError)),
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

export default connect(mapStateToProps, mapDispatchToProps)(LessonPage);
