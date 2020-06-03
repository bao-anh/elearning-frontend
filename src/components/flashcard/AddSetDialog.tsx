import React, { FunctionComponent, useState } from 'react';
import Loading from '../../components/common/Loading';

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
  PhotoCamera as PhotoCameraIcon,
} from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});
const AddSetDialog: FunctionComponent<{
  isOpenDialog: any;
  setIsOpenDialog: any;
  addSet: any;
  onError: any;
}> = ({ isOpenDialog, setIsOpenDialog, addSet, onError }) => {
  const [setInfo, setSetInfo] = useState({
    name: '',
    description: '',
    visiable: 0,
    editable: 0,
  });
  const [error, setError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  // @ts-ignore
  let fileSelected = null as File;

  const handleChangeFile = (selectorFiles: FileList) => {
    fileSelected = selectorFiles[0];
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
      setSetInfo({
        name: '',
        description: '',
        visiable: 0,
        editable: 0,
      });
      setIsSubmit(true);
      let formData = new FormData();
      formData.append('imageURL', fileSelected);
      formData.append('name', setInfo.name);
      formData.append('description', setInfo.description);
      addSet(formData, onError, onSuccess);
    }
  };

  const onSuccess = () => {
    setIsSubmit(false);
    setIsOpenDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={isOpenDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsOpenDialog(false)}
      >
        {isSubmit ? (
          <div className='assignment-dialog-overlay' style={{ opacity: '0.5' }}>
            <Loading />
          </div>
        ) : null}
        <div className='assigment-dialog-header'>
          <div className='assigment-dialog-header-title'>Thêm học phần mới</div>
          <IconButton
            className='assigment-dialog-close-icon'
            onClick={() => setIsOpenDialog(false)}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <div className='add-set-content'>
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
            <input
              accept='image/*'
              id='icon-button-file'
              type='file'
              name='image'
              // @ts-ignore
              onChange={(e) => handleChangeFile(e.target.files)}
              style={{ flexGrow: 1 }}
            />
            <label htmlFor='icon-button-file'>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='span'
              >
                <PhotoCameraIcon />
              </IconButton>
            </label>
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
                <MenuItem value={0}>Chỉ mình tôi</MenuItem>
                <MenuItem value={1}>Mọi người</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id='editable-select-label'>Ai có thể sửa</InputLabel>
              <Select
                name='editable'
                labelId='editable-select-label'
                value={setInfo.editable}
                onChange={(e) => handleChange(e)}
                fullWidth
              >
                <MenuItem value={0}>Chỉ mình tôi</MenuItem>
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
          <Button
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            fullWidth
            disabled={isSubmit}
          >
            Thêm học phần
          </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default AddSetDialog;
