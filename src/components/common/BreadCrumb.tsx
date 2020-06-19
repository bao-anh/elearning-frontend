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
  setState?: any;
  path: any;
  params?: any;
}> = ({
  courseState,
  setState,
  lessonState,
  topicState,
  path,
  assignmentState,
  params,
}) => {
  const renderContent = () => {
    if (path === Routes.FLASHCARD_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/flashcard' className='breadcrumb-current-link'>
            Học từ vựng
          </Link>
        </Breadcrumbs>
      );
    }
    if (path === Routes.SET_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/flashcard' className='breadcrumb-link'>
            Học từ vựng
          </Link>
          <Link to={`/set/${params.id}`} className='breadcrumb-current-link'>
            {setState.current.name}
          </Link>
        </Breadcrumbs>
      );
    }
    if (path === Routes.EDIT_SET_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/flashcard' className='breadcrumb-link'>
            Học từ vựng
          </Link>
          {setState.current.termIds.length ? (
            <Link to={`/set/${params.id}`} className='breadcrumb-link'>
              {setState.current.name}
            </Link>
          ) : (
            <Link to={`/set/${params.id}/edit`} className='breadcrumb-link'>
              {setState.current.name}
            </Link>
          )}
          <Link
            to={`/set/${params.id}/edit`}
            className='breadcrumb-current-link'
          >
            Chỉnh sửa học phần
          </Link>
        </Breadcrumbs>
      );
    }
    if (path === Routes.WRITE_SET_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/flashcard' className='breadcrumb-link'>
            Học từ vựng
          </Link>
          {params.id === 'all' ? null : (
            <Link to={`/set/${params.id}`} className='breadcrumb-link'>
              {setState.current.name ? setState.current.name : 'Học phần'}
            </Link>
          )}
          <Link
            to={`/set/${params.id}/write`}
            className='breadcrumb-current-link'
          >
            Luyện viết
          </Link>
        </Breadcrumbs>
      );
    }
    if (path === Routes.LISTEN_SET_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/flashcard' className='breadcrumb-link'>
            Học từ vựng
          </Link>
          {params.id === 'all' ? null : (
            <Link to={`/set/${params.id}`} className='breadcrumb-link'>
              {setState.current.name ? setState.current.name : 'Học phần'}
            </Link>
          )}
          <Link
            to={`/set/${params.id}/listen`}
            className='breadcrumb-current-link'
          >
            Luyện nghe
          </Link>
        </Breadcrumbs>
      );
    }
    if (path === Routes.STUDY_SET_SCREEN) {
      return (
        <Breadcrumbs
          separator='›'
          aria-label='breadcrumb'
          className='breadcrumb-container'
        >
          <Link to='/' className='breadcrumb-link'>
            Trang chủ
          </Link>
          <Link to='/flashcard' className='breadcrumb-link'>
            Học từ vựng
          </Link>
          {params.id === 'all' ? null : (
            <Link to={`/set/${params.id}`} className='breadcrumb-link'>
              {setState.current.name ? setState.current.name : 'Học phần'}
            </Link>
          )}
          <Link
            to={`/set/${params.id}/study`}
            className='breadcrumb-current-link'
          >
            Học
          </Link>
        </Breadcrumbs>
      );
    }
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
