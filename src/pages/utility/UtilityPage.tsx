import React, { useEffect, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { handleExtractErrorMessage } from '../../utils';
import Banner from '../../components/course/Banner';
import BreadCrumb from '../../components/common/BreadCrumb';
import PurchaseWarningDialog from '../../components/course/PurchaseWarningDialog';
import UtilitySideBar from '../../components/course/UtilitySideBar';
import UserInfoSideBar from '../../components/course/UserInfoSideBar';
import HeaderPanel from '../../components/common/HeaderPanel';
import Loading from '../../components/common/Loading';
import MemberTable from '../../components/course/MemberTable';
import ReferenceTable from '../../components/course/ReferenceTable';
import SnackBar from '../../components/common/SnackBar';
import * as operationAction from '../../redux/actions/operation';

import { Grid } from '@material-ui/core';

const UtilityPage: FunctionComponent<{
  fetchDataInUtilityPage: Function;
  match: any;
  topicState: any;
  authState: any;
}> = ({ match, fetchDataInUtilityPage, topicState, authState }) => {
  useEffect(() => {
    fetchDataInUtilityPage(match.params.id, onError);
    //eslint-disable-next-line
  }, [match]);

  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: '',
    message: '',
  });

  const isNotReadyToRender = topicState.isLoadingLargeTopic;

  const onError = (response: any) => {
    let message = handleExtractErrorMessage(response);
    setSnackBar({
      isOpen: true,
      severity: 'error',
      message,
    });
  };

  const renderSnackBar = () => {
    if (snackBar.isOpen) {
      return <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />;
    } else return null;
  };

  if (isNotReadyToRender) return <Loading />;
  else
    return (
      <React.Fragment>
        {renderSnackBar()}
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
              <MemberTable topicState={topicState} />
            </HeaderPanel>
            <HeaderPanel title='Danh sách tài liệu'>
              <ReferenceTable topicState={topicState} />
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
  fetchDataInUtilityPage: (courseId: number, onError: any) =>
    dispatch(operationAction.fetchDataInUtilityPage(courseId, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UtilityPage);
