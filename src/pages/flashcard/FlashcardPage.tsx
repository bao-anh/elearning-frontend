import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/appstate';
import { handleExtractErrorMessage } from '../../utils';
import { v4 as uuidv4 } from 'uuid';
import * as setAction from '../../redux/actions/set';
import BreadCrumb from '../../components/common/BreadCrumb';
import FlashcardHeader from '../../components/flashcard/FlashcardHeader';
import FlashcardContent from '../../components/flashcard/FlashcardContent';
import ModifySetDialog from '../../components/flashcard/ModifySetDialog';
import StudySetDialog from '../../components/flashcard/StudySetDialog';
import Loading from '../../components/common/Loading';
import SnackBar from '../../components/common/SnackBar';
import '../../resources/scss/flashcard/flashcard.scss';

import { Grid } from '@material-ui/core';

const FlashcardPage: FunctionComponent<{
  addSet: Function;
  addSetByLink: Function;
  updateSet: Function;
  fetchSet: Function;
  searchSetById: Function;
  match: any;
  setState: any;
  authState: any;
  history: any;
}> = ({
  addSet,
  addSetByLink,
  updateSet,
  fetchSet,
  searchSetById,
  match,
  setState,
  authState,
  history,
}) => {
  useEffect(() => {
    fetchSet(onError);
    //eslint-disable-next-line
  }, [match]);

  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isOpenStudyDialog, setIsOpenStudyDialog] = useState(false);
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

  const isNotReadyToRender = setState.isLoading;

  const onError = (response: any) => {
    let message = handleExtractErrorMessage(response);
    setSnackBar({
      isOpen: true,
      severity: 'error',
      message,
    });
  };

  const onWarning = (message: any) => {
    setSnackBar({
      isOpen: true,
      severity: 'warning',
      message,
    });
  };

  const onSuccess = (setInfo: any) => {
    setSetInfo(setInfo);
    setIsSearch(true);
  };

  const onMessage = (message: any) => {
    setSnackBar({
      isOpen: true,
      severity: 'success',
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
        <BreadCrumb path={match.path} />
        <ModifySetDialog
          isAdd={isAdd}
          isEdit={isEdit}
          isSearch={isSearch}
          setIsAdd={setIsAdd}
          setIsEdit={setIsEdit}
          setIsSearch={setIsSearch}
          setInfo={setInfo}
          setSetInfo={setSetInfo}
          addSet={addSet}
          addSetByLink={addSetByLink}
          updateSet={updateSet}
          onError={onError}
          onWarning={onWarning}
          onMessage={onMessage}
        />
        <StudySetDialog
          isOpenStudyDialog={isOpenStudyDialog}
          setIsOpenStudyDialog={setIsOpenStudyDialog}
        />
        <Grid container className='container'>
          <Grid item xs={12}>
            <FlashcardHeader
              searchSetById={searchSetById}
              onWarning={onWarning}
              onSuccess={onSuccess}
              setState={setState}
              setIsAdd={setIsAdd}
              setIsOpenStudyDialog={setIsOpenStudyDialog}
            />
          </Grid>
          <Grid item xs={12}>
            <FlashcardContent
              setState={setState}
              authState={authState}
              setIsEdit={setIsEdit}
              setSetInfo={setSetInfo}
              history={history}
            />
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
  addSetByLink: (setId: any, onWarning: any, onSuccess: any) =>
    dispatch(setAction.addSetByLink(setId, onWarning, onSuccess)),
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
  searchSetById: (setId: any, onWarning: any, onSuccess: any) =>
    dispatch(setAction.searchSetById(setId, onWarning, onSuccess)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardPage);
