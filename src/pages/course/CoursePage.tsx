import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
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
    fetchDataInCoursePage(match.params.id);
    //eslint-disable-next-line
  }, [match]);

  return (
    <React.Fragment>
      <Banner />
      <BreadCrumb
        path={match.path}
        courseState={courseState}
        topicState={topicState}
      />
      <Grid container className='container'>
        <Grid item xs={9}>
          <TopicContent path={match.path} topicState={topicState} />
          <Comment />
        </Grid>
        <Grid item xs={3}>
          <UserInfoSideBar lessonState={lessonState} />
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
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInCoursePage: (courseId: number) =>
    dispatch(operationAction.fetchDataInCoursePage(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
