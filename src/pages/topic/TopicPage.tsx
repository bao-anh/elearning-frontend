import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainWidget } from '../../components/Widgets';
import { getIdByPathName } from '../../utils';
import BreadCrumb from '../../components/BreadCrumb';
import TopicContent from '../../components/TopicContent';
import TopicSideBar from '../../components/TopicSideBar';
import UserInfoSideBar from '../../components/UserInfoSideBar';
import UtilitySideBar from '../../components/UtilitySideBar';
import Comment from '../../components/Comment';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

import { Grid } from '@material-ui/core';

const TopicPage: FunctionComponent<{
  fetchDataInTopicPage: Function;
  match: any;
  courseState: any;
  topicState: any;
  lessonState: any;
}> = ({
  fetchDataInTopicPage,
  match,
  courseState,
  topicState,
  lessonState,
}) => {
  useEffect(() => {
    const pathname = match.params.pathname;
    if (match.params.pathname) {
      const topicId = getIdByPathName(pathname);
      fetchDataInTopicPage(topicId);
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
      />
      <Grid container className='container'>
        <Grid item xs={9}>
          <TopicContent path={match.path} topicState={topicState} />
          <Comment />
        </Grid>
        <Grid item xs={3}>
          <TopicSideBar path={match.path} topicState={topicState} />
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
  fetchDataInTopicPage: (topicId: number) =>
    dispatch(operationAction.fetchDataInTopicPage(topicId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);
