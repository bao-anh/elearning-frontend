import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { FixedContainer } from '../../components/Widgets';
import { getIdByPathName } from '../../utils';
import '../../resources/scss/about.scss';
import '../../resources/scss/main.scss';

const AssignmentPage: FunctionComponent<{
  match: any;
}> = ({ match }) => {
  useEffect(() => {
    const pathname = match.params.pathname;
    if (match.params.pathname) {
      const topicId = getIdByPathName(pathname);
      console.log(topicId);
      // fetchSmallTopicByTopicId(topicId);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <FixedContainer>
        <h1>That is assigment page</h1>
      </FixedContainer>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    assignmentState: state.assignmentState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentPage);
