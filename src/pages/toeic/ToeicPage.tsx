import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as operationAction from '../../redux/actions/operation';
import * as toeicAction from '../../redux/actions/toeic';
import HeaderPanel from '../../components/common/HeaderPanel';
import ProgressPanel from '../../components/toiec/ProgressPanel';
import BreadCrumb from '../../components/common/BreadCrumb';
import ToeicContent from '../../components/toiec/ToeicContent';
import Loading from '../../components/common/Loading';

import { Grid } from '@material-ui/core';

const ToeicPage: FunctionComponent<{
  fetchDataInToeicPage: Function;
  submitToeicScore: Function;
  authState: any;
  toeicState: any;
  match: any;
}> = ({
  fetchDataInToeicPage,
  submitToeicScore,
  authState,
  toeicState,
  match,
}) => {
  useEffect(() => {
    if (authState.toeicId) {
      fetchDataInToeicPage();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <BreadCrumb path={match.path} />
      <Grid container className='container'>
        <Grid item xs={9}>
          <HeaderPanel title='Tiến độ luyện tập'>
            <ProgressPanel
              authState={authState}
              submitToeicScore={submitToeicScore}
            />
          </HeaderPanel>
          {authState.toeicId ? (
            <HeaderPanel title='Các phần luyện tập'>
              {toeicState.isLoading ? <Loading /> : <ToeicContent />}
            </HeaderPanel>
          ) : null}
        </Grid>
        <Grid item xs={3}>
          This is right panel
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    toeicState: state.toeicState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchDataInToeicPage: () => dispatch(operationAction.fetchDataInToeicPage()),
  submitToeicScore: (currentScore: any, targetScore: any) =>
    dispatch(toeicAction.submitToeicScore(currentScore, targetScore)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToeicPage);
