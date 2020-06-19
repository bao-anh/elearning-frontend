import React, { FunctionComponent, useState } from 'react';
import Loading from '../common/Loading';
import { v4 as uuidv4 } from 'uuid';

import { TransitionProps } from '@material-ui/core/transitions';
import {
  Slide,
  Dialog,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});
const AddSetDialog: FunctionComponent<{
  isAdd: any;
  isEdit: any;
  isSearch: any;
  setIsAdd: any;
  setIsEdit: any;
  setIsSearch: any;
  setInfo: any;
  setSetInfo: any;
  addSet: any;
  addSetByLink: any;
  updateSet: any;
  onError: any;
  onWarning: any;
  onMessage: any;
}> = ({
  isAdd,
  isEdit,
  isSearch,
  setIsAdd,
  setIsEdit,
  setIsSearch,
  setInfo,
  setSetInfo,
  addSet,
  addSetByLink,
  updateSet,
  onError,
  onWarning,
  onMessage,
}) => {
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowDeleteIcon, setIsShowDeleteIcon] = useState(false);

  const handleChangeFile = (e: any) => {
    setSetInfo({
      ...setInfo,
      imageLocalURL: URL.createObjectURL(e.target.files[0]),
      imageLocalFile: e.target.files[0],
    });
  };

  const handleChange = (e: any) => {
    setSetInfo({ ...setInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (setInfo.name === '') {
      setError('Tên học phần không được để trống');
    } else if (setInfo.visiable === 0 && setInfo.editable === 1) {
      setError('Mọi người không được chỉnh sửa khi học phần này là riêng tư');
    } else {
      setError('');
      setIsSubmit(true);
      let formData = new FormData();
      formData.append('name', setInfo.name);
      formData.append('description', setInfo.description);
      formData.append('imageURL', setInfo.imageLocalFile);
      formData.append('visiable', setInfo.visiable);
      formData.append('editable', setInfo.editable);
      if (isAdd) addSet(formData, onError, onSuccess);
      else if (isSearch) {
        addSetByLink(setInfo._id, onWarning, onSuccess);
      } else {
        if (
          setInfo.imageURL === '' ||
          setInfo.imageLocalURL !== setInfo.imageURL
        ) {
          updateSet(formData, setInfo._id, true, onError, onSuccess);
        } else {
          updateSet(setInfo, setInfo._id, false, onError, onSuccess);
        }
      }
    }
  };

  const onSuccess = () => {
    if (isAdd) {
      onMessage('Thêm mới học phần thành công!');
    } else if (isSearch) {
      onMessage('Thêm thành công học phần vào danh sách!');
    } else if (isEdit) {
      onMessage('Chỉnh sửa học phần thành công');
    }
    setIsSubmit(false);
    setIsEdit(false);
    setIsAdd(false);
    setIsSearch(false);
    setSetInfo({
      _id: uuidv4(),
      name: '',
      description: '',
      imageLocalURL: '',
      imageLocalFile: null,
      imageURL: '',
      visiable: 0,
      editable: 0,
    });
  };

  const handleClose = () => {
    setSetInfo({
      _id: uuidv4(),
      name: '',
      description: '',
      imageLocalURL: '',
      imageLocalFile: null,
      imageURL: '',
      visiable: 0,
      editable: 0,
    });
    setIsEdit(false);
    setIsAdd(false);
    setIsSearch(false);
  };

  const handleDeleteImage = () => {
    setSetInfo({
      ...setInfo,
      imageLocalURL: '',
      imageLocalFile: null,
      imageURL: '',
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={isAdd || isEdit || isSearch}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose()}
      >
        {isSubmit ? (
          <div className='assignment-dialog-overlay' style={{ opacity: '0.5' }}>
            <Loading />
          </div>
        ) : null}
        <div className='assigment-dialog-header'>
          <div className='assigment-dialog-header-title'>
            {isAdd
              ? 'Thêm học phần mới'
              : isEdit
              ? 'Chỉnh sửa học phần'
              : 'Bạn có muốn thêm học phần này?'}
          </div>
          <IconButton
            className='assigment-dialog-close-icon'
            onClick={() => handleClose()}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <div className='add-set-content flex-center'>
          {isSearch ? <div className='assignment-dialog-overlay' /> : null}
          <div>
            <div className='add-set-textfield'>
              <TextField
                label='Tên học phần'
                id='outlined-number'
                name='name'
                value={setInfo.name}
                onChange={(e) => handleChange(e)}
                fullWidth
                style={{ marginRight: '10px' }}
              />
              <TextField
                label='Mô tả'
                id='outlined-number2'
                name='description'
                value={setInfo.description}
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </div>
            <div className='add-set-textfield'>
              <FormControl fullWidth style={{ marginRight: '10px' }}>
                <InputLabel id='visiable-select-label'>Hiển thị với</InputLabel>
                <Select
                  name='visiable'
                  labelId='visiable-select-label'
                  value={setInfo.visiable}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                >
                  <MenuItem value={0}>Chỉ người sở hữu</MenuItem>
                  <MenuItem value={1}>Mọi người</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id='editable-select-label'>
                  Ai có thể sửa
                </InputLabel>
                <Select
                  name='editable'
                  labelId='editable-select-label'
                  value={setInfo.editable}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                >
                  <MenuItem value={0}>Chỉ người sở hữu</MenuItem>
                  <MenuItem value={1}>Mọi người</MenuItem>
                </Select>
              </FormControl>
            </div>
            {error !== '' ? (
              <Typography
                color='secondary'
                variant='body2'
                style={{ marginBottom: '10px' }}
              >
                {error}
              </Typography>
            ) : null}
          </div>
          {setInfo.imageLocalURL && setInfo.imageLocalURL !== '' ? (
            <div
              className='modify-set-image-wrap'
              onMouseEnter={() => setIsShowDeleteIcon(true)}
              onMouseLeave={() => setIsShowDeleteIcon(false)}
            >
              <img
                src={setInfo.imageLocalURL}
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
          ) : setInfo.imageURL ? (
            <div
              className='edit-set-image-wrap'
              onMouseEnter={() => setIsShowDeleteIcon(true)}
              onMouseLeave={() => setIsShowDeleteIcon(false)}
            >
              <img
                src={setInfo.imageURL}
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
          ) : (
            <div className='modify-set-content-item-image'>
              <input
                accept='image/*'
                id={setInfo._id}
                type='file'
                name='imageLocalURL'
                // @ts-ignore
                onChange={(e) => handleChangeFile(e)}
                style={{ visibility: 'hidden' }}
              />
              <label
                htmlFor={setInfo._id}
                className='edit-set-content-image-icon'
              >
                <ImageIcon />
                <div>Hình ảnh</div>
              </label>
            </div>
          )}
        </div>
        <div className='modify-set-dialog-wrap-button'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            fullWidth
            disabled={isSubmit}
          >
            {isEdit ? 'Chỉnh sửa học phần' : 'Thêm học phần'}
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default AddSetDialog;
