import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Routes from '../routes';
import { sortArrayByPropertyValue } from '../utils';
import '../resources/scss/component/topicContent.scss';

import { Paper } from '@material-ui/core';
import {
  Assignment as AssignmentIcon,
  Alarm as AlarmIcon,
  Airplay as AirplayIcon,
} from '@material-ui/icons';

const TopicContent: FunctionComponent<{
  assignmentState: any;
  topicState: any;
  path: any;
}> = ({ assignmentState, topicState, path }) => {
  const renderContent = () => {
    if (path === Routes.LESSON_SCREEN) {
      return sortArrayByPropertyValue(assignmentState.data, 'orderIndex').map(
        (assignment: any) => (
          <div className='topic-item-panel' key={assignment.id}>
            <div className='topic-item-left-panel'>
              <div className='topic-item-number'>
                <span>{assignment.orderIndex + 1}</span>
              </div>
            </div>
            <div className='topic-item-row-info-panel'>
              <div className='topic-item-content'>
                <AssignmentIcon style={{ padding: '10px' }} />
                <div className='name-panel topic-detail-item-content'>
                  <Link
                    to={`/assignment/${assignment.friendlyUrl}-${assignment.id}`}
                    className='name-panel link-panel'
                  >
                    {assignment.name}
                  </Link>
                  <div className='topic-detail-number-question'>
                    {`${assignment.childrentIds.length} Câu hỏi`}
                  </div>
                </div>
                <div className='topic-item-progress'>-</div>
              </div>
            </div>
          </div>
        )
      );
    }
    if (path === Routes.TOPIC_SCREEN) {
      return sortArrayByPropertyValue(
        topicState.smallTopic.data,
        'orderIndex'
      ).map((topic: any) => (
        <div className='topic-item-panel' key={topic.id}>
          <div className='topic-item-left-panel'>
            <div className='topic-item-number'>
              <span>{topic.orderIndex + 1}</span>
            </div>
          </div>
          <div className='topic-item-row-info-panel'>
            <div className='topic-item-content'>
              {topic.type === 1 ? (
                <AirplayIcon style={{ padding: '10px' }} />
              ) : (
                <AlarmIcon style={{ padding: '10px' }} />
              )}
              <div className='name-panel topic-detail-item-content'>
                <Link
                  to={`/lesson/${topic.friendlyUrl}-${topic.id}`}
                  className='name-panel link-panel'
                >
                  {topic.name}
                </Link>
                {topic.type === 1 ? (
                  <div className='topic-detail-number-question'>
                    {`${topic.totalVideo} Bài giảng / ${topic.documentIds.length} Tài liệu / ${topic.totalExercise} Bài tập`}
                  </div>
                ) : (
                  <div className='topic-detail-number-question'>
                    {`${topic.childrentIds.length} Câu hỏi`}
                  </div>
                )}
              </div>
              <div className='topic-item-progress'>-</div>
            </div>
          </div>
        </div>
      ));
    }
    if (path === Routes.COURSE_SCREEN) {
      return sortArrayByPropertyValue(
        topicState.largeTopic.data,
        'orderIndex'
      ).map((topic: any) => (
        <div className='topic-item-panel' key={topic.id}>
          <div className='topic-item-left-panel'>
            <div className='topic-item-number'>
              <span>{topic.orderIndex + 1}</span>
            </div>
          </div>
          <div className='topic-item-row-info-panel'>
            <div className='topic-item-content'>
              {topic.type === 1 ? (
                <AirplayIcon style={{ padding: '10px' }} />
              ) : (
                <AlarmIcon style={{ padding: '10px' }} />
              )}
              <div className='name-panel topic-detail-item-content'>
                <Link
                  to={`/topic/${topic.friendlyUrl}-${topic.id}`}
                  className='name-panel link-panel'
                >
                  {topic.name}
                </Link>
                {topic.type === 1 ? (
                  <div className='topic-detail-number-question'>
                    {`${topic.childrentIds.length} Bài`}
                  </div>
                ) : (
                  <div className='topic-detail-number-question'>
                    {`${topic.childrentIds.length} Câu hỏi`}
                  </div>
                )}
              </div>
              <div className='topic-item-progress'>-</div>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <Paper elevation={1} className='main-block-panel content-block-panel'>
      <div className='main-block-header-panel'>Nội dung bài học</div>
      <div className='block main-block-content-panel'>
        {assignmentState.isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div className='topic-item-header-panel'>
              <div className='top-item-header-left-panel'></div>
              <div className='topic-item-content'>
                <div className='name-panel'>Tên bài học</div>
                <div className='topic-item-progress'>Tiến độ học</div>
              </div>
            </div>
            {renderContent()}
          </React.Fragment>
        )}
      </div>
    </Paper>
  );
};

export default TopicContent;
