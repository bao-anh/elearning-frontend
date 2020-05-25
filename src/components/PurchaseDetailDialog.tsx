import React, { FunctionComponent, useState } from 'react';
import '../resources/scss/component/purchaseDetailDialog.scss';

import {
  Button,
  Dialog,
  DialogTitle,
  Slide,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import {
  LocalOffer as LocalOfferIcon,
  Group as GroupIcon,
  EventNote as EventNoteIcon,
} from '@material-ui/icons';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const PurchaseDialog: FunctionComponent<{
  purchaseCourse: Function;
  setIsOpenPurchaseDetailCourse: any;
  isOpenPurchaseDetailCourse?: any;
  course: any;
}> = ({
  purchaseCourse,
  setIsOpenPurchaseDetailCourse,
  isOpenPurchaseDetailCourse,
  course,
}) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const handlePurchaseCourse = () => {
    purchaseCourse(course._id, onSuccess);
  };

  const onSuccess = () => {
    setIsSubmit(false);
    setIsOpenPurchaseDetailCourse(false);
  };

  return (
    <div>
      <Dialog
        open={isOpenPurchaseDetailCourse}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
        classes={{ paper: 'purchase-dialog' }}
      >
        <DialogTitle
          id='alert-dialog-slide-title'
          className='custom-block-header-panel'
        >
          {'Bạn muốn mua khóa học'}
        </DialogTitle>
        <div className='purchase-dialog-container'>
          <div className='purchase-dialog-content'>
            <div className='purchase-dialog-left-content'>
              <img
                src={course.avatar}
                alt='avatar'
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className='purchase-dialog-right-content'>
              <div>
                <h1 className='right-content-title'>{course.name}</h1>
              </div>
              <div className='purchase-dialog-flex'>
                <LocalOfferIcon color='secondary' fontSize='large' />
                <Typography variant='h4' color='secondary'>
                  {course.currentPrice ? `${course.currentPrice} VNĐ` : 'FREE'}
                </Typography>
              </div>
              <div className='purchase-dialog-flex purchase-dialog-text'>
                <GroupIcon />
                {`Tổng số học viên: ${course.memberIds.length}`}
              </div>
              <div className='purchase-dialog-flex purchase-dialog-text'>
                <EventNoteIcon />
                {`Tổng số chủ đề: ${course.topicIds.length}`}
              </div>
              <div className='purchase-dialog-flex purchase-dialog-description-text'>
                {course.description}
              </div>
            </div>
          </div>
          <div className='purchase-dialog-button'>
            <Button
              color='primary'
              variant='outlined'
              onClick={() => setIsOpenPurchaseDetailCourse(false)}
              fullWidth
              style={{ marginRight: '5px' }}
              disabled={isSubmit}
            >
              Bỏ qua
            </Button>
            <Button
              color='primary'
              variant='contained'
              onClick={() => handlePurchaseCourse()}
              fullWidth
              disabled={isSubmit}
            >
              {isSubmit ? (
                <CircularProgress color='primary' size={22} />
              ) : (
                'Mua khóa học'
              )}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PurchaseDialog;
