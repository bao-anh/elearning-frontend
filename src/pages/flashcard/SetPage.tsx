import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as setAction from '../../redux/actions/set';
import SnackBar from '../../components/common/SnackBar';
import BreadCrumb from '../../components/common/BreadCrumb';

import { Grid } from '@material-ui/core';

const SetPage: FunctionComponent<{
  fetchSetById: any;
  setState: any;
  match: any;
}> = ({ fetchSetById, setState, match }) => {
  useEffect(() => {
    fetchSetById(match.params.id, onError);
  }, [match]);

  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: '',
    message: '',
  });

  const onError = (data: any) => {
    let message = '';
    if (data.errors) {
      data.errors.forEach((error: any) => {
        message += `${error.msg}. `;
      });
    } else message += data.msg;
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

  return (
    <React.Fragment>
      {renderSnackBar()}
      <BreadCrumb path={match.path} params={match.params} />
      <Grid container className='container'>
        <Grid item xs={12}>
          Nothing to show right now
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    authState: state.authState,
    setState: state.setState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  fetchSetById: (setId: any, onError: any) =>
    dispatch(setAction.fetchSetById(setId, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetPage);
