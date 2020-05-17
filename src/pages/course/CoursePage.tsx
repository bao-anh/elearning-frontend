import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as courseAction from '../../redux/actions/course';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainWidget, FixedContainer } from '../../components/Widgets';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';
import { getIdByPathName } from '../../utils';

const CoursePage: FunctionComponent<{
  fetchCourseByCourseId: Function;
  match: any;
}> = ({ fetchCourseByCourseId, match }) => {
  useEffect(() => {
    const pathname = match.params.pathname;
    if (match.params.pathname) {
      const courseId = getIdByPathName(pathname);
      fetchCourseByCourseId(courseId);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <MainWidget className={'about-page'}>
      <Header />
      <FixedContainer>
        <h1>That is course page</h1>
      </FixedContainer>
      <Footer />
    </MainWidget>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    topicState: state.topicState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchCourseByCourseId: (courseId: number) =>
    dispatch(courseAction.fetchCourseByCourseId(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
