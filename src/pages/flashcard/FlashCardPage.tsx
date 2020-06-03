import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import * as setAction from '../../redux/actions/set';
// @ts-ignore
import { useSpeechSynthesis } from 'react-speech-kit';
import BreadCrumb from '../../components/common/BreadCrumb';
import FlashcardHeader from '../../components/flashcard/FlashcardHeader';
import FlashcardContent from '../../components/flashcard/FlashcardContent';
import Loading from '../../components/common/Loading';
import SnackBar from '../../components/common/SnackBar';
import '../../resources/scss/flashcard/flashcard.scss';

import { Grid } from '@material-ui/core';

const FlashcardPage: FunctionComponent<{
  addSet: Function;
  fetchSet: Function;
  match: any;
  authState: any;
  setState: any;
  history: any;
}> = ({ addSet, fetchSet, match, authState, setState, history }) => {
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    speak({ text: '' });
    fetchSet(onError);
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
      <BreadCrumb path={match.path} />
      <Grid container className='container'>
        <Grid item xs={12}>
          <FlashcardHeader
            setState={setState}
            addSet={addSet}
            onError={onError}
          />
        </Grid>
        <Grid item xs={12}>
          {setState.isLoading ? (
            <Loading />
          ) : (
            <FlashcardContent setState={setState} history={history} />
          )}
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
  addSet: (set: any, onError: any, onSuccess: any) =>
    dispatch(setAction.addSet(set, onError, onSuccess)),
  fetchSet: (onError: any) => dispatch(setAction.fetchSet(onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardPage);
