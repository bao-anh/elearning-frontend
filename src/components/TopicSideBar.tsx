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
  lessonState: any;
  path: any;
}> = ({ topicState, lessonState, path }) => {
  const renderContent = (topic: any) => {
    if (path === Routes.LESSON_SCREEN) {
      return (
        <div
          key={topic.id}
          className='topic-item'
          style={
            lessonState.current.id === topic.id
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
    }
    if (path === Routes.TOPIC_SCREEN) {
      return (
        <div key={topic.id} className='topic-item'>
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
    }
  };

  return (
    <Paper elevation={1} className='custom-block-panel topic-tree-panel'>
      <div className='custom-block-header-panel'>Bài tập</div>
      <div className='block custom-block-content-panel'>
        {topicState.isLoadingSmallTopic ? (
          <Loading />
        ) : (
          sortArrayByPropertyValue(
            topicState.smallTopic,
            'orderIndex'
          ).map((topic: any) => renderContent(topic))
        )}
      </div>
    </Paper>
  );
};

export default TopicSideBar;
