import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import PurchaseWarningDialog from '../../components/course/PurchaseWarningDialog';
import VideoDialog from './VideoDialog';
import Loading from '../../components/common/Loading';
import Reference from '../../components/course/Reference';
import TopicContent from '../../components/course/TopicContent';
import TopicSideBar from '../../components/course/TopicSideBar';
import UserInfoSideBar from '../../components/common/UserInfoSideBar';
import Comment from '../../components/course/Comment';
import UtilitySideBar from '../../components/course/UtilitySideBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import '../../resources/scss/lesson.scss';

import { Paper, Grid } from '@material-ui/core';

const LessonPage: FunctionComponent<{
  fetchDataInLessonPage: Function;
  match: any;
  topicState: any;
  lessonState: any;
  courseState: any;
  authState: any;
}> = ({
  fetchDataInLessonPage,
  match,
  topicState,
  lessonState,
  courseState,
  authState,
}) => {
  const [isOpenVideo, setOpenVideo] = useState(false);

  useEffect(() => {
    fetchDataInLessonPage(match.params.id);
    //eslint-disable-next-line
  }, [match]);

  return (
    <React.Fragment>
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
            lessonState={lessonState}
          />
        )}

        <Grid item xs={9}>
          <Paper
            elevation={1}
            className='main-block-panel topic-content-find-media-element'
          >
            <div className='main-block-header-panel'>Mô tả</div>
            <div className='video-panel'>
              <img
                className='video-panel-img'
                alt='video img'
                src='https://storage.googleapis.com/comaiphuong-edu-media/images/images_default_videojs.jpg'
                src-video-js='https://ngonngu.vncdn.vn/output/toeic450/part1/part1bai1304499552.mp4/1/2/1119/304499552.m3u8'
                onClick={() => setOpenVideo(true)}
              />
            </div>
          </Paper>
          <TopicContent
            topicState={topicState}
            lessonState={lessonState}
            path={match.path}
          />
          <Reference lessonState={lessonState} />
          <Comment />
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
  fetchDataInLessonPage: (lessonId: number) =>
    dispatch(operationAction.fetchDataInLessonPage(lessonId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonPage);
