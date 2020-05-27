import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import PurchaseWarningDialog from '../../components/course/PurchaseWarningDialog';
import BreadCrumb from '../../components/common/BreadCrumb';
import TopicContent from '../../components/course/TopicContent';
import TopicSideBar from '../../components/course/TopicSideBar';
import UserInfoSideBar from '../../components/common/UserInfoSideBar';
import UtilitySideBar from '../../components/course/UtilitySideBar';
import Comment from '../../components/course/Comment';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

import { Grid } from '@material-ui/core';

const TopicPage: FunctionComponent<{
  fetchDataInTopicPage: Function;
  match: any;
  courseState: any;
  topicState: any;
  lessonState: any;
  authState: any;
}> = ({
  fetchDataInTopicPage,
  match,
  courseState,
  topicState,
  lessonState,
  authState,
}) => {
  useEffect(() => {
    fetchDataInTopicPage(match.params.id);
    //eslint-disable-next-line
  }, [match]);

  return (
    <React.Fragment>
      <BreadCrumb
        path={match.path}
        courseState={courseState}
        topicState={topicState}
      />
      <PurchaseWarningDialog
        match={match}
        authState={authState}
        topicState={topicState}
      />
      <Grid container className='container'>
        <Grid item xs={9}>
          <TopicContent path={match.path} topicState={topicState} />
          <Comment />
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
    courseState: state.courseState,
    topicState: state.topicState,
    lessonState: state.lessonState,
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInTopicPage: (topicId: number) =>
    dispatch(operationAction.fetchDataInTopicPage(topicId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);
