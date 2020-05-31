import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../../routes';
import '../../resources/scss/component/breadcrumb.scss';

import { Breadcrumbs } from '@material-ui/core';

const BreadCrumb: FunctionComponent<{
  courseState?: any;
  topicState?: any;
  lessonState?: any;
  assignmentState?: any;
  path: any;
  params?: any;
}> = ({
  courseState,
  lessonState,
  topicState,
  path,
  assignmentState,
  params,
}) => {
  const renderContent = () => {
    if (path === Routes.TOEIC_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/toeic' className='breadcrumb-current-link'>
            Luyện thi TOEIC
          </Link>
        </Breadcrumbs>
      );
    }
    if (path === Routes.TEST_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/toeic' className='breadcrumb-link'>
            Luyện thi TOEIC
          </Link>
          {!isNaN(Number(params.part)) ? (
            <Link
              to={`/test/${params.part}`}
              className='breadcrumb-current-link'
            >
              {`Bài thi Part ${params.part}`}
            </Link>
          ) : params.part === 'short-test' ? (
            <Link
              to={`/test/${params.part}`}
              className='breadcrumb-current-link'
            >
              Bài thi rút gọn
            </Link>
          ) : params.part === 'full-test' ? (
            <Link
              to={`/test/${params.part}`}
              className='breadcrumb-current-link'
            >
              Bài thi hoàn chỉnh
            </Link>
          ) : null}
        </Breadcrumbs>
      );
    }
    if (path === Routes.CATEGORY_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/category/all' className='breadcrumb-current-link'>
            Tất cả các khóa học
          </Link>
        </Breadcrumbs>
      );
    }
    if (path === Routes.COURSE_SCREEN || path === Routes.UTILITY_SCREEN) {
      if (topicState.largeTopic) {
        return (
          <Breadcrumbs
            separator='›'
            aria-label='breadcrumb'
            className='breadcrumb-container'
          >
            <Link to='/' className='breadcrumb-link'>
              Trang chủ
            </Link>
            <Link to='/category/all' className='breadcrumb-link'>
              Tất cả các khóa học
            </Link>
            <Link
              to={`/course/${topicState.largeTopic._id}`}
              className='breadcrumb-current-link'
            >
              {topicState.largeTopic.name}
            </Link>
          </Breadcrumbs>
        );
      }
    }
    if (path === Routes.TOPIC_SCREEN) {
      if (topicState.largeTopic && topicState.smallTopic) {
        return (
          <Breadcrumbs
            separator='›'
            aria-label='breadcrumb'
            className='breadcrumb-container'
          >
            <Link to='/' className='breadcrumb-link'>
              Trang chủ
            </Link>
            <Link to='/category/all' className='breadcrumb-link'>
              Tất cả các khóa học
            </Link>
            <Link
              to={`/course/${topicState.largeTopic._id}`}
              className='breadcrumb-link'
            >
              {topicState.largeTopic.name}
            </Link>
            <Link
              to={`/topic/${topicState.smallTopic._id}`}
              className='breadcrumb-current-link'
            >
              {topicState.smallTopic.name}
            </Link>
          </Breadcrumbs>
        );
      }
    }
    if (path === Routes.LESSON_SCREEN) {
      if (topicState.largeTopic && topicState.smallTopic && lessonState.data) {
        return (
          <Breadcrumbs
            separator='›'
            aria-label='breadcrumb'
            className='breadcrumb-container'
          >
            <Link to='/' className='breadcrumb-link'>
              Trang chủ
            </Link>
            <Link to='/category/all' className='breadcrumb-link'>
              Tất cả các khóa học
            </Link>
            <Link
              to={`/course/${topicState.largeTopic._id}`}
              className='breadcrumb-link'
            >
              {topicState.largeTopic.name}
            </Link>
            <Link
              to={`/topic/${topicState.smallTopic._id}`}
              className='breadcrumb-link'
            >
              {topicState.smallTopic.name}
            </Link>
            <Link
              to={`/lesson/${lessonState.data._id}`}
              className='breadcrumb-current-link'
            >
              {lessonState.data.name}
            </Link>
          </Breadcrumbs>
        );
      }
    }
    if (path === Routes.ASSIGNMENT_SCREEN) {
      if (
        topicState.largeTopic &&
        topicState.smallTopic &&
        assignmentState.data
      ) {
        return (
          <Breadcrumbs
            separator='›'
            aria-label='breadcrumb'
            className='breadcrumb-container'
          >
            <Link to='/' className='breadcrumb-link'>
              Trang chủ
            </Link>
            <Link to='/category/all' className='breadcrumb-link'>
              Tất cả các khóa học
            </Link>
            <Link
              to={`/course/${topicState.largeTopic._id}`}
              className='breadcrumb-link'
            >
              {topicState.largeTopic.name}
            </Link>
            <Link
              to={`/topic/${topicState.smallTopic._id}`}
              className='breadcrumb-link'
            >
              {topicState.smallTopic.name}
            </Link>
            <Link
              to={`/assignment/${assignmentState.data._id}`}
              className='breadcrumb-current-link'
            >
              {assignmentState.data.name}
            </Link>
          </Breadcrumbs>
        );
      }
    }
  };

  return <div>{renderContent()}</div>;
};

export default BreadCrumb;
