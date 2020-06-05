import React, { FunctionComponent, useState } from 'react';
import Loading from '../common/Loading';

import { Grid, Paper, TextField } from '@material-ui/core';
import { Delete as DeleteIcon, Image as ImageIcon } from '@material-ui/icons';

const EditSetContentItem: FunctionComponent<{
  handleDeleteTerm: any;
  term: any;
  index: any;
  handleChangeTerm: any;
  isSubmit: any;
}> = React.memo(
  ({ handleDeleteTerm, isSubmit, term, index, handleChangeTerm }) => {
    const [isShowDeleteIcon, setIsShowDeleteIcon] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const handleChange = (e: any) => {
      handleChangeTerm(index, e.target.name, e.target.value);
    };

    const handleChangeFile = (e: any) => {
      handleChangeTerm(
        index,
        e.target.name,
        URL.createObjectURL(e.target.files[0])
      );
      handleChangeTerm(index, 'imageLocalFile', e.target.files[0]);
      handleChangeTerm(index, 'imageName', e.target.files[0].name);
    };

    const handleDeleteImage = () => {
      handleChangeTerm(index, 'imageLocalFile', '');
      handleChangeTerm(index, 'imageLocalURL', '');
      handleChangeTerm(index, 'imageURL', '');
      handleChangeTerm(index, 'imageName', '');
    };

    return (
      <Grid item xs={12}>
        <Paper elevation={1} className='edit-set-content-item-paper'>
          {isDelete ? (
            <div
              className='assignment-dialog-overlay'
              style={{ opacity: '0.8' }}
            >
              <Loading />
            </div>
          ) : null}
          <div className='edit-set-content-item-header'>
            <div className='edit-set-content-item-header-order'>
              {index + 1}
            </div>
            <DeleteIcon
              onClick={() => {
                handleDeleteTerm(index);
                setIsDelete(true);
              }}
              className='edit-set-content-item-delete'
              style={
                isSubmit ? { visibility: 'hidden' } : { visibility: 'visible' }
              }
            />
          </div>
          <div className='edit-set-content-item-container'>
            <TextField
              name='name'
              id={`standard-basic-${term._id}`}
              label='Thuật ngữ'
              value={term.name}
              style={{ width: '40%', marginRight: '10px' }}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
            <TextField
              id={`standard-multiline-${term._id}`}
              name='definition'
              label='Định nghĩa'
              multiline
              rowsMax={3}
              value={term.definition}
              style={{ width: '40%', marginRight: '10px' }}
              onChange={(e) => handleChange(e)}
              fullWidth
            />
            {term.imageLocalURL && term.imageLocalURL !== '' ? (
              <div
                className='edit-set-image-wrap'
                onMouseEnter={() => setIsShowDeleteIcon(true)}
                onMouseLeave={() => setIsShowDeleteIcon(false)}
              >
                <img
                  src={term.imageLocalURL}
                  height='100%'
                  width='100%'
                  alt='set'
                />
                <DeleteIcon
                  onClick={() => handleDeleteImage()}
                  className='edit-set-image-wrap-delete-icon'
                  style={
                    isShowDeleteIcon
                      ? { visibility: 'visible' }
                      : { visibility: 'hidden' }
                  }
                />
              </div>
            ) : term.imageURL ? (
              <div
                className='edit-set-image-wrap'
                onMouseEnter={() => setIsShowDeleteIcon(true)}
                onMouseLeave={() => setIsShowDeleteIcon(false)}
              >
                <img src={term.imageURL} height='100%' width='100%' alt='set' />
                <DeleteIcon
                  onClick={() => handleDeleteImage()}
                  className='edit-set-image-wrap-delete-icon'
                  style={
                    isShowDeleteIcon
                      ? { visibility: 'visible' }
                      : { visibility: 'hidden' }
                  }
                />
              </div>
            ) : (
              <div className='edit-set-content-item-image'>
                <input
                  accept='image/*'
                  id={term._id}
                  type='file'
                  name='imageLocalURL'
                  // @ts-ignore
                  onChange={(e) => handleChangeFile(e)}
                  style={{ visibility: 'hidden', width: 0, height: 0 }}
                />
                <label
                  htmlFor={term._id}
                  className='edit-set-content-image-icon'
                >
                  <ImageIcon />
                  <div>Hình ảnh</div>
                </label>
              </div>
            )}
          </div>
        </Paper>
      </Grid>
    );
  }
);

export default EditSetContentItem;
