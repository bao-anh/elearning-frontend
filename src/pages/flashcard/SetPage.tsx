import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as setAction from '../../redux/actions/set';
import SnackBar from '../../components/common/SnackBar';
import BreadCrumb from '../../components/common/BreadCrumb';
import SetPageCard from '../../components/flashcard/SetPageCard';
import SetPageLeft from '../../components/flashcard/SetPageLeft';
import SetPageRight from '../../components/flashcard/SetPageRight';
import SetPageBottom from '../../components/flashcard/SetPageBottom';
import HeaderPanel from '../../components/common/HeaderPanel';
import Loading from '../../components/common/Loading';

import { Grid } from '@material-ui/core';

const SetPage: FunctionComponent<{
  fetchSetById: any;
  setState: any;
  match: any;
  history: any;
}> = ({ fetchSetById, setState, match, history }) => {
  useEffect(() => {
    fetchSetById(match.params.id, onError);
    //eslint-disable-next-line
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
      {setState.isLoading || !Object.keys(setState.current).length ? null : (
        <BreadCrumb
          path={match.path}
          params={match.params}
          setState={setState}
        />
      )}
      <Grid container className='container'>
        {setState.isLoading || !Object.keys(setState.current).length ? (
          <Loading />
        ) : (
          <SetPageLeft setState={setState.current} history={history} />
        )}
        {setState.isLoading || !Object.keys(setState.current).length ? (
          <Loading />
        ) : (
          <SetPageCard setState={setState.current} />
        )}
        {setState.isLoading || !Object.keys(setState.current).length ? (
          <Loading />
        ) : (
          <Grid item xs={4}>
            <HeaderPanel title='Tỷ lệ học thuộc các từ vựng'>
              <SetPageRight setState={setState} />
            </HeaderPanel>
          </Grid>
        )}
        {setState.isLoading || !Object.keys(setState.current).length ? (
          <Loading />
        ) : (
          <SetPageBottom setState={setState.current} />
        )}
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
