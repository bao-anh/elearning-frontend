import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { sortArrayByPropertyValue } from '../utils';
import Loading from './Loading';
import Routes from '../routes';
import '../resources/scss/component/topicSideBar.scss';

import { Paper } from '@material-ui/core';
import {
  MenuBook as MenuBookIcon,
  Alarm as AlarmIcon,
} from '@material-ui/icons';

const TopicSideBar: FunctionComponent<{
  topicState: any;
  lessonState?: any;
  path: any;
}> = ({ topicState, lessonState, path }) => {
  const renderTopicContent = (topic: any) => {
    return (
      <div
        key={topic.id}
        className='topic-item'
        style={
          topicState.currentLargeTopic &&
          topicState.currentLargeTopic.id === topic.id
            ? { backgroundColor: '#eeeeee' }
            : {}
        }
      >
        {topic.type === 1 ? (
          <React.Fragment>
            <MenuBookIcon className='topic-item-icon' />
            <Link
              to={`/topic/${topic.friendlyUrl}-${topic.id}`}
              className='link'
            >
              {topic.name}
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <AlarmIcon className='topic-item-icon' />
            <Link
              to={`/assignment/${topic.friendlyUrl}-${topic.id}`}
              className='link'
            >
              {topic.name}
            </Link>
          </React.Fragment>
        )}
      </div>
    );
  };

  const renderLessonContent = (topic: any) => {
    return (
      <div
        key={topic.id}
        className='topic-item'
        style={
          lessonState.current && lessonState.current.id === topic.id
            ? { backgroundColor: '#eeeeee' }
            : {}
        }
      >
        {topic.type === 1 ? (
          <React.Fragment>
            <MenuBookIcon className='topic-item-icon' />
            <Link
              to={`/lesson/${topic.friendlyUrl}-${topic.id}`}
              className='link'
            >
              {topic.name}
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <AlarmIcon className='topic-item-icon' />
            <Link
              to={`/assignment/${topic.friendlyUrl}-${topic.id}`}
              className='link'
            >
              {topic.name}
            </Link>
          </React.Fragment>
        )}
      </div>
    );
  };

  const renderLoading = () => {
    if (path === Routes.LESSON_SCREEN) {
      return topicState.isLoadingSmallTopic ? (
        <Loading />
      ) : (
        sortArrayByPropertyValue(
          topicState.smallTopic,
          'orderIndex'
        ).map((topic: any) => renderLessonContent(topic))
      );
    }
    if (path === Routes.TOPIC_SCREEN) {
      return topicState.isLoadingLargeTopic ? (
        <Loading />
      ) : (
        sortArrayByPropertyValue(
          topicState.largeTopic,
          'orderIndex'
        ).map((topic: any) => renderTopicContent(topic))
      );
    }
  };

  return (
    <Paper elevation={1} className='custom-block-panel topic-tree-panel'>
      <div className='custom-block-header-panel'>Bài tập</div>
      <div className='block custom-block-content-panel'>{renderLoading()}</div>
    </Paper>
  );
};

export default TopicSideBar;
