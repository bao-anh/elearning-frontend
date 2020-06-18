import React, { FunctionComponent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditSetContentItem from './EditSetContentItem';
import EditSetHeader from './EditSetHeader';

import { Paper, Grid, Button, CircularProgress } from '@material-ui/core';

const EditSetContent: FunctionComponent<{
  modifyTermBySetId: Function;
  deleteTermBySetId: Function;
  setState: any;
  onError: any;
  history: any;
}> = ({ modifyTermBySetId, deleteTermBySetId, setState, onError, history }) => {
  const [termArray, setTermArray] = useState(setState.termIds);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleAddSet = () => {
    setTermArray([
      ...termArray,
      {
        _id: uuidv4(),
        name: '',
        definition: '',
        imageLocalURL: '',
        imageLocalFile: null,
        imageName: '',
      },
    ]);
  };

  const handleSubmit = () => {
    let updateWithImageArray = [] as any[];
    let updateWithOutImageArray = [] as any[];
    let createArray = [] as any[];

    const filteredTermArray = termArray.filter((term: any) => {
      if (term.name === '' || term.definition === '') return false;
      else return true;
    });

    filteredTermArray.forEach((newTerm: any) => {
      let alreadyIn = false;
      setState.termIds.forEach((term: any) => {
        if (term._id === newTerm._id) {
          alreadyIn = true;
          if (term.imageName !== newTerm.imageName) {
            let formData = new FormData();
            formData.append('name', newTerm.name);
            formData.append('definition', newTerm.definition);
            formData.append('imageURL', newTerm.imageLocalFile);
            formData.append('imageName', newTerm.imageName);
            updateWithImageArray.push({
              termId: newTerm._id,
              payload: formData,
            });
            return;
          } else if (
            term.name !== newTerm.name ||
            term.definition !== newTerm.definition
          ) {
            updateWithOutImageArray.push({
              termId: newTerm._id,
              payload: {
                name: newTerm.name,
                definition: newTerm.definition,
              },
            });
          }
        }
      });
      if (alreadyIn === false) {
        let formData = new FormData();
        formData.append('name', newTerm.name);
        formData.append('definition', newTerm.definition);
        formData.append('imageURL', newTerm.imageLocalFile);
        formData.append('imageName', newTerm.imageName);
        createArray.push(formData);
      }
    });
    modifyTermBySetId(
      setState._id,
      createArray,
      updateWithImageArray,
      updateWithOutImageArray,
      onError,
      onSuccess
    );
  };

  const onSuccess = () => {
    if (setState.termIds.length) history.push(`/set/${setState._id}`);
    else history.push('/flashcard');
  };

  const onDeleteSuccess = (_id: any) => {
    const newTerm = termArray.filter((term: any) => term._id !== _id);
    setTermArray(newTerm);
  };

  const handleDeleteTerm = (index: number) => {
    const isTermInDB =
      setState.termIds.filter((term: any) => term._id === termArray[index]._id)
        .length > 0;
    if (isTermInDB) {
      deleteTermBySetId(
        setState._id,
        termArray[index]._id,
        onError,
        onDeleteSuccess
      );
    } else {
      onDeleteSuccess(termArray[index]._id);
    }
  };

  const handleChangeTerm = (index: number, name: any, value: any) => {
    setTermArray((termState: any) => {
      const newTermState = [...termState];
      const newTerm = { ...newTermState[index], [name]: value };
      newTermState[index] = newTerm;
      return newTermState;
    });
  };

  return (
    <React.Fragment>
      <Grid item xs={12} className='sticky-header'>
        <EditSetHeader
          setState={setState}
          handleSubmit={handleSubmit}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
        />
      </Grid>
      {termArray.map((term: any, index: any) => (
        <EditSetContentItem
          key={term._id}
          term={term}
          index={index}
          handleChangeTerm={handleChangeTerm}
          isSubmit={isSubmit}
          handleDeleteTerm={handleDeleteTerm}
        />
      ))}
      <Grid item xs={12}>
        <Paper elevation={1} className='edit-set-content-add'>
          <Button variant='outlined' color='primary' onClick={handleAddSet}>
            Thêm thẻ mới
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} className='edit-set-content-complete'>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            handleSubmit();
            setIsSubmit(true);
          }}
          disabled={isSubmit}
        >
          {isSubmit ? (
            <CircularProgress color='primary' size={22} />
          ) : (
            'Hoàn tất'
          )}
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default EditSetContent;
