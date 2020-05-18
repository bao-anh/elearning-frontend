import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainWidget } from '../../components/Widgets';
import { getIdByPathName } from '../../utils';
import Banner from '../../components/Banner';
import BreadCrumb from '../../components/BreadCrumb';
import TopicContent from '../../components/TopicContent';
import UserInfoSideBar from '../../components/UserInfoSideBar';
import UtilitySideBar from '../../components/UtilitySideBar';
import Comment from '../../components/Comment';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

import { Grid } from '@material-ui/core';

const CoursePage: FunctionComponent<{
  fetchDataInCoursePage: Function;
  match: any;
  courseState: any;
  topicState: any;
  lessonState: any;
}> = ({
  fetchDataInCoursePage,
  match,
  courseState,
  topicState,
  lessonState,
}) => {
  useEffect(() => {
    const pathname = match.params.pathname;
    if (match.params.pathname) {
      const courseId = getIdByPathName(pathname);
      fetchDataInCoursePage(courseId);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <MainWidget className={'home-page'}>
      <Header />
      <Banner />
      <BreadCrumb path={match.path} courseState={courseState} />
      <Grid container className='container'>
        <Grid xs={9}>
          <TopicContent path={match.path} topicState={topicState} />
          <Comment />
        </Grid>
        <Grid xs={3}>
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
    courseState: state.courseState,
    topicState: state.topicState,
    lessonState: state.lessonState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInCoursePage: (courseId: number) =>
    dispatch(operationAction.fetchDataInCoursePage(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
