import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../routes';
import '../resources/scss/component/breadcrumb.scss';

import { Breadcrumbs } from '@material-ui/core';

const BreadCrumb: FunctionComponent<{
  courseState?: any;
  lessonState?: any;
  topicState?: any;
  path: any;
}> = ({ courseState, lessonState, topicState, path }) => {
  const renderContent = () => {
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
          <Link to='/category' className='breadcrumb-current-link'>
            Tất cả các khóa học
          </Link>
        </Breadcrumbs>
      );
    }
    if (path === Routes.COURSE_SCREEN) {
      if (courseState.current) {
        return (
          <Breadcrumbs
            separator='›'
            aria-label='breadcrumb'
            className='breadcrumb-container'
          >
            <Link to='/' className='breadcrumb-link'>
              Trang chủ
            </Link>
            <Link to='/category' className='breadcrumb-link'>
              Tất cả các khóa học
            </Link>
            <Link
              to={`/course/${courseState.current.friendlyUrl}-${courseState.current.id}`}
              className='breadcrumb-current-link'
            >
              {courseState.current.name}
            </Link>
          </Breadcrumbs>
        );
      }
    }
    if (path === Routes.TOPIC_SCREEN) {
      if (courseState.current && topicState.currentLargeTopic) {
        return (
          <Breadcrumbs
            separator='›'
            aria-label='breadcrumb'
            className='breadcrumb-container'
          >
            <Link to='/' className='breadcrumb-link'>
              Trang chủ
            </Link>
            <Link to='/category' className='breadcrumb-link'>
              Tất cả các khóa học
            </Link>
            <Link
              to={`/course/${courseState.current.friendlyUrl}-${courseState.current.id}`}
              className='breadcrumb-link'
            >
              {courseState.current.name}
            </Link>
            <Link
              to={`/topic/${topicState.currentLargeTopic.friendlyUrl}-${topicState.currentLargeTopic.id}`}
              className='breadcrumb-current-link'
            >
              {topicState.currentLargeTopic.name}
            </Link>
          </Breadcrumbs>
        );
      }
    }
    if (path === Routes.LESSON_SCREEN) {
      if (
        courseState.current &&
        lessonState.current &&
        topicState.currentLargeTopic
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
            <Link to='/category' className='breadcrumb-link'>
              Tất cả các khóa học
            </Link>
            <Link
              to={`/course/${courseState.current.friendlyUrl}-${courseState.current.id}`}
              className='breadcrumb-link'
            >
              {courseState.current.name}
            </Link>
            <Link
              to={`/topic/${topicState.currentLargeTopic.friendlyUrl}-${topicState.currentLargeTopic.id}`}
              className='breadcrumb-link'
            >
              {topicState.currentLargeTopic.name}
            </Link>
            <Link
              to={`/lesson/${lessonState.current.friendlyUrl}-${lessonState.current.id}`}
              className='breadcrumb-current-link'
            >
              {lessonState.current.name}
            </Link>
          </Breadcrumbs>
        );
      }
    }
  };

  return <div>{renderContent()}</div>;
};

export default BreadCrumb;
