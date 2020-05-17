import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import { getIdByPathName } from '../../utils';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainWidget } from '../../components/Widgets';
import VideoDialog from './VideoDialog';
import Loading from '../../components/Loading';
import Reference from '../../components/Reference';
import TopicContent from '../../components/TopicContent';
import TopicSideBar from '../../components/TopicSideBar';
import UserInfoSideBar from '../../components/UserInfoSideBar';
import Comment from '../../components/Comment';
import UtilitySideBar from '../../components/UtilitySideBar';
import BreadCrumb from '../../components/BreadCrumb';
import '../../resources/scss/lesson.scss';

import { Paper, Grid } from '@material-ui/core';

const LessonPage: FunctionComponent<{
  fetchDataInLessonPage: Function;
  match: any;
  assignmentState: any;
  topicState: any;
  lessonState: any;
  referenceState: any;
  courseState: any;
}> = ({
  fetchDataInLessonPage,
  match,
  assignmentState,
  topicState,
  lessonState,
  referenceState,
  courseState,
}) => {
  const [isOpenVideo, setOpenVideo] = useState(false);

  useEffect(() => {
    const pathname = match.params.pathname;
    if (match.params.pathname) {
      const topicId = getIdByPathName(pathname);
      fetchDataInLessonPage(topicId);
    }
    //eslint-disable-next-line
  }, [match]);

  return (
    <MainWidget className={'home-page'}>
      <Header />
      <BreadCrumb
        path={match.path}
        courseState={courseState}
        topicState={topicState}
        lessonState={lessonState}
      />
      <Grid container className='container'>
        <VideoDialog
          isOpenVideo={isOpenVideo}
          setOpenVideo={setOpenVideo}
          lessonState={lessonState.current}
          assignmentState={assignmentState.data}
          referenceState={referenceState}
        />
        <Grid item xs={9}>
          <Paper
            elevation={1}
            className='main-block-panel topic-content-find-media-element'
          >
            <div className='main-block-header-panel'>Mô tả</div>
            {lessonState.isLoading | assignmentState.isLoading ? (
              <Loading />
            ) : (
              <div className='video-panel'>
                <img
                  className='video-panel-img'
                  alt='video img'
                  src='https://storage.googleapis.com/comaiphuong-edu-media/images/images_default_videojs.jpg'
                  src-video-js='https://ngonngu.vncdn.vn/output/toeic450/part1/part1bai1304499552.mp4/1/2/1119/304499552.m3u8'
                  onClick={() => setOpenVideo(true)}
                />
              </div>
            )}
          </Paper>
          <TopicContent
            assignmentState={assignmentState}
            topicState={topicState}
            path={match.path}
          />
          <Reference referenceState={referenceState} />
          <Comment />
        </Grid>
        <Grid item xs={3}>
          <TopicSideBar
            topicState={topicState}
            lessonState={lessonState}
            path={match.path}
          />
          <UserInfoSideBar topicState={topicState} lessonState={lessonState} />
          <UtilitySideBar />
        </Grid>
      </Grid>
      <Footer />
    </MainWidget>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    lessonState: state.lessonState,
    assignmentState: state.assignmentState,
    topicState: state.topicState,
    referenceState: state.referenceState,
    courseState: state.courseState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInLessonPage: (topicId: number) =>
    dispatch(operationAction.fetchDataInLessonPage(topicId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonPage);
