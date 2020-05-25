import React, { useEffect, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import Banner from '../../components/Banner';
import BreadCrumb from '../../components/BreadCrumb';
import PurchaseWarningDialog from '../../components/PurchaseWarningDialog';
import UtilitySideBar from '../../components/UtilitySideBar';
import UserInfoSideBar from '../../components/UserInfoSideBar';
import HeaderPanel from '../../components/HeaderPanel';
import Loading from '../../components/Loading';
import MemberTable from '../../components/MemberTable';
import ReferenceTable from '../../components/ReferenceTable';
import * as operationAction from '../../redux/actions/operation';

import { Grid } from '@material-ui/core';

const UtilityPage: FunctionComponent<{
  fetchDataInUtilityPage: Function;
  match: any;
  topicState: any;
  authState: any;
}> = ({ match, fetchDataInUtilityPage, topicState, authState }) => {
  useEffect(() => {
    fetchDataInUtilityPage(match.params.id);
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
          <HeaderPanel title='Danh sách thành viên'>
            {topicState.isLoadingLargeTopic ? (
              <Loading />
            ) : (
              <MemberTable topicState={topicState} />
            )}
          </HeaderPanel>
          <HeaderPanel title='Danh sách tài liệu'>
            {topicState.isLoadingLargeTopic ? (
              <Loading />
            ) : (
              <ReferenceTable topicState={topicState} />
            )}
          </HeaderPanel>
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
    topicState: state.topicState,
    authState: state.authState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInUtilityPage: (courseId: number) =>
    dispatch(operationAction.fetchDataInUtilityPage(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UtilityPage);
