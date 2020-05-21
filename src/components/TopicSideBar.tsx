import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { sortArrayByPropertyValue } from '../utils';
import Loading from './Loading';
import Routes from '../routes';
import '../resources/scss/component/topicSideBar.scss';

import { Paper } from '@material-ui/core';
import {
  MenuBook as MenuBookIcon,
  Airplay as AirplayIcon,
  Alarm as AlarmIcon,
} from '@material-ui/icons';

const TopicSideBar: FunctionComponent<{
  topicState: any;
  currentId?: any;
  path: any;
}> = ({ topicState, path, currentId }) => {
  const renderTopicContent = (topic: any) => {
    return (
      <div
        key={topic._id}
        className='topic-item'
        style={currentId === topic._id ? { backgroundColor: '#eeeeee' } : {}}
      >
        <AirplayIcon className='topic-item-icon' />
        <Link to={`/topic/${topic._id}`} className='link'>
          {topic.name}
        </Link>
      </div>
    );
  };

  const renderLessonContent = (topic: any) => {
    return (
      <div
        key={topic._id}
        className='topic-item'
        style={currentId === topic._id ? { backgroundColor: '#eeeeee' } : {}}
      >
        {topic.videoLink ? (
          <React.Fragment>
            <MenuBookIcon className='topic-item-icon' />
            <Link to={`/lesson/${topic._id}`} className='link'>
              {topic.name}
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <AlarmIcon className='topic-item-icon' />
            <Link to={`/assignment/${topic._id}`} className='link'>
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
          [
            ...topicState.smallTopic.assignmentIds,
            ...topicState.smallTopic.lessonIds,
          ],
          'orderIndex'
        ).map((topic: any) => renderLessonContent(topic))
      );
    }
    if (path === Routes.TOPIC_SCREEN) {
      return topicState.isLoadingLargeTopic ? (
        <Loading />
      ) : (
        topicState.largeTopic.topicIds.map((topic: any) =>
          renderTopicContent(topic)
        )
      );
    }
  };

  return (
    <Paper elevation={1} className='custom-block-panel topic-tree-panel'>
      <div className='custom-block-header-panel'>
        Nội dung khác cùng danh mục
      </div>
      <div className='block custom-block-content-panel'>{renderLoading()}</div>
    </Paper>
  );
};

export default TopicSideBar;
