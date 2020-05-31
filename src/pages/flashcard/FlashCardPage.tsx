import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import BreadCrumb from '../../components/common/BreadCrumb';

import { Grid } from '@material-ui/core';

const FlashCardPage: FunctionComponent<{ match: any; authState: any }> = ({
  match,
  authState,
}) => {
  return (
    <React.Fragment>
      <BreadCrumb path={match.path} />
      <Grid container className='container'>
        <Grid item xs={9}>
          <h1>Comming soon...</h1>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    toeicState: state.toeicState,
    scaleState: state.scaleState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FlashCardPage);
