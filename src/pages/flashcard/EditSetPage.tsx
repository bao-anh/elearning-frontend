import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as setAction from '../../redux/actions/set';
import BreadCrumb from '../../components/common/BreadCrumb';
import SnackBar from '../../components/common/SnackBar';
import Loading from '../../components/common/Loading';
import EditSetContent from '../../components/flashcard/EditSetContent';
import '../../resources/scss/flashcard/flashcard.scss';

import { Grid } from '@material-ui/core';

const EditSetPage: FunctionComponent<{
  fetchSetById: Function;
  modifyTermBySetId: Function;
  deleteTermBySetId: Function;
  match: any;
  setState: any;
  history: any;
}> = ({
  fetchSetById,
  modifyTermBySetId,
  deleteTermBySetId,
  match,
  setState,
  history,
}) => {
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
      <BreadCrumb path={match.path} params={match.params} />
      <Grid container className='container'>
        {setState.isLoading || !Object.keys(setState.current).length ? (
          <Loading />
        ) : (
          <EditSetContent
            setState={setState.current}
            modifyTermBySetId={modifyTermBySetId}
            deleteTermBySetId={deleteTermBySetId}
            onError={onError}
            history={history}
          />
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
  modifyTermBySetId: (
    setId: any,
    createArray: any,
    updateWithImageArray: any,
    updateWithOutImageArray: any,
    onError: any,
    onSuccess: any
  ) =>
    dispatch(
      setAction.modifyTermBySetId(
        setId,
        createArray,
        updateWithImageArray,
        updateWithOutImageArray,
        onError,
        onSuccess
      )
    ),
  deleteTermBySetId: (setId: any, termId: any, onError: any, onSuccess: any) =>
    dispatch(setAction.deleteTermBySetId(setId, termId, onError, onSuccess)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSetPage);
