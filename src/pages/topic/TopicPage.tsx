import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as topicAction from '../../redux/actions/topic';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainWidget, FixedContainer } from '../../components/Widgets';
import { getIdByPathName } from '../../utils';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

const TopicPage: FunctionComponent<{
  fetchSmallTopicByTopicId: Function;
  match: any;
}> = ({ fetchSmallTopicByTopicId, match }) => {
  useEffect(() => {
    const pathname = match.params.pathname;
    if (match.params.pathname) {
      const topicId = getIdByPathName(pathname);
      fetchSmallTopicByTopicId(topicId);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <MainWidget className={'about-page'}>
      <Header />
      <FixedContainer>
        <h1>That is lesson page</h1>
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
  fetchSmallTopicByTopicId: (topicId: number) =>
    dispatch(topicAction.fetchSmallTopicByTopicId(topicId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);
