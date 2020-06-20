import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { handleExtractErrorMessage } from '../../utils';
import * as setAction from '../../redux/actions/set';
import SnackBar from '../../components/common/SnackBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import SetPageCard from '../../components/flashcard/SetPageCard';
import SetPageLeft from '../../components/flashcard/SetPageLeft';
import SetPageRight from '../../components/flashcard/SetPageRight';
import SetPageBottom from '../../components/flashcard/SetPageBottom';
import PermissionDialog from '../../components/flashcard/PermissionDialog';
import HeaderPanel from '../../components/common/HeaderPanel';
import Loading from '../../components/common/Loading';

import { Grid } from '@material-ui/core';

const SetPage: FunctionComponent<{
  fetchSetById: any;
  setState: any;
  authState: any;
  match: any;
  history: any;
}> = ({ fetchSetById, setState, authState, match, history }) => {
  useEffect(() => {
    fetchSetById(match.params.id, onError);
    //eslint-disable-next-line
  }, [match]);

  const [snackBar, setSnackBar] = useState({
    isOpen: false,
    severity: '',
    message: '',
  });

  const isPermitted = authState.setIds.includes(setState.current._id);

  const isNotReadyToRender =
    setState.isLoading || !Object.keys(setState.current).length;

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
  else if (!isPermitted) return <PermissionDialog />;
  else
    return (
      <React.Fragment>
        {renderSnackBar()}
        <BreadCrumb
          path={match.path}
          params={match.params}
          setState={setState}
        />
        <Grid container className='container'>
          <SetPageLeft
            setState={setState.current}
            authState={authState}
            history={history}
          />
          <SetPageCard setState={setState.current} />
          <Grid item xs={4}>
            <HeaderPanel title='Tỷ lệ học thuộc các từ vựng'>
              <SetPageRight setState={setState} />
            </HeaderPanel>
          </Grid>
          <SetPageBottom setState={setState.current} />
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
