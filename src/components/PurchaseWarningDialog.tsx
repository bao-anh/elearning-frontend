import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../routes';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});

const PurchaseDialog: FunctionComponent<{
  match: any;
  lessonState?: any;
  authState: any;
  assignmentState?: any;
  topicState?: any;
}> = ({ match, lessonState, authState, assignmentState, topicState }) => {
  const isPurchased = (courseId: any) => {
    return (
      authState.courseIds.filter(
        (userCourse: any) => userCourse._id === courseId
      ).length > 0
    );
  };

  const handleOpenDialog = () => {
    if (!authState.courseIds.length) return true;
    else if (
      match.path === Routes.COURSE_SCREEN ||
      match.path === Routes.UTILITY_SCREEN
    ) {
      if (!topicState.isLoadingLargeTopic) {
        return !isPurchased(topicState.largeTopic._id);
      }
    } else if (match.path === Routes.TOPIC_SCREEN) {
      if (!topicState.isLoadingSmallTopic) {
        return !isPurchased(topicState.smallTopic.courseId);
      }
    } else if (match.path === Routes.LESSON_SCREEN) {
      if (!lessonState.isLoading) {
        return !isPurchased(lessonState.data.courseId);
      }
    } else if (match.path === Routes.ASSIGNMENT_SCREEN) {
      if (!assignmentState.isLoading) {
        return !isPurchased(assignmentState.data.courseId);
      }
    }
    return false;
  };

  return (
    <div>
      <Dialog
        open={handleOpenDialog()}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Bạn chưa mua khóa học ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Bạn chưa mua khóa học này nên không được quyền truy cập, để biết
            thêm thông tin chi tiết, vui lòng liên hệ ban quản trị.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='primary' variant='contained'>
            <Link
              to='/category/all'
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Quay lại trang tìm kiếm khóa học
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PurchaseDialog;
