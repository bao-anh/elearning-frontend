import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import Banner from '../../components/course/Banner';
import BreadCrumb from '../../components/common/BreadCrumb';
import PurchaseWarningDialog from '../../components/course/PurchaseWarningDialog';
import TopicContent from '../../components/course/TopicContent';
import UserInfoSideBar from '../../components/course/UserInfoSideBar';
import UtilitySideBar from '../../components/course/UtilitySideBar';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

import { Grid } from '@material-ui/core';

const CoursePage: FunctionComponent<{
  fetchDataInCoursePage: Function;
  match: any;
  courseState: any;
  topicState: any;
  lessonState: any;
  authState: any;
}> = ({
  fetchDataInCoursePage,
  match,
  courseState,
  topicState,
  lessonState,
  authState,
}) => {
  useEffect(() => {
    fetchDataInCoursePage(match.params.id);
    //eslint-disable-next-line
  }, [match]);

  return (
    <React.Fragment>
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
  fetchDataInCoursePage: (courseId: number) =>
    dispatch(operationAction.fetchDataInCoursePage(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
