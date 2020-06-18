import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { v4 as uuidv4 } from 'uuid';
import * as setAction from '../../redux/actions/set';
import BreadCrumb from '../../components/common/BreadCrumb';
import FlashcardHeader from '../../components/flashcard/FlashcardHeader';
import FlashcardContent from '../../components/flashcard/FlashcardContent';
import ModifySetDialog from '../../components/flashcard/ModifySetDialog';
import Loading from '../../components/common/Loading';
import SnackBar from '../../components/common/SnackBar';
import '../../resources/scss/flashcard/flashcard.scss';

import { Grid } from '@material-ui/core';

const FlashcardPage: FunctionComponent<{
  addSet: Function;
  updateSet: Function;
  fetchSet: Function;
  match: any;
  setState: any;
  history: any;
}> = ({ addSet, updateSet, fetchSet, match, setState, history }) => {
  useEffect(() => {
    fetchSet(onError);
    //eslint-disable-next-line
  }, [match]);

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [setInfo, setSetInfo] = useState({
    _id: uuidv4(),
    name: '',
    description: '',
    imageLocalURL: '',
    imageLocalFile: null,
    imageURL: '',
    visiable: 0,
    editable: 0,
  });

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
      <ModifySetDialog
        isAdd={isAdd}
        isEdit={isEdit}
        setIsAdd={setIsAdd}
        setIsEdit={setIsEdit}
        setInfo={setInfo}
        setSetInfo={setSetInfo}
        addSet={addSet}
        updateSet={updateSet}
        onError={onError}
      />
      <Grid container className='container'>
        <Grid item xs={12}>
          <FlashcardHeader setState={setState} setIsAdd={setIsAdd} />
        </Grid>
        <Grid item xs={12}>
          {setState.isLoading ? (
            <Loading />
          ) : (
            <FlashcardContent
              setState={setState}
              setIsEdit={setIsEdit}
              setSetInfo={setSetInfo}
              history={history}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState, ownProps: any) => {
  return {
    setState: state.setState,
    ...ownProps,
  };
};
const mapDispatchToProps = (dispatch: any) => ({
  addSet: (set: any, onError: any, onSuccess: any) =>
    dispatch(setAction.addSet(set, onError, onSuccess)),
  updateSet: (
    set: any,
    setId: any,
    isUpdateWithImage: any,
    onError: any,
    onSuccess: any
  ) =>
    dispatch(
      setAction.updateSet(set, setId, isUpdateWithImage, onError, onSuccess)
    ),
  fetchSet: (onError: any) => dispatch(setAction.fetchSet(onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardPage);
