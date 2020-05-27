import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import Routes from '../../routes';
import { sortArrayByPropertyValue, renderNumberOfQuestion } from '../../utils';
import '../../resources/scss/component/topicContent.scss';

import { Paper, CircularProgress } from '@material-ui/core';
import {
  Assignment as AssignmentIcon,
  Alarm as AlarmIcon,
  Airplay as AirplayIcon,
  MenuBook as MenuBookIcon,
} from '@material-ui/icons';

const TopicContent: FunctionComponent<{
  lessonState?: any;
  topicState?: any;
  path: any;
}> = ({ topicState, lessonState, path }) => {
  const renderContent = () => {
    if (path === Routes.LESSON_SCREEN) {
      return lessonState.data.assignmentIds.map(
        (assignment: any, index: number) => (
          <div className='topic-item-panel' key={assignment._id}>
            <div className='topic-item-left-panel'>
              <div className='topic-item-number'>
                <span>{index + 1}</span>
              </div>
            </div>
            <div className='topic-item-row-info-panel'>
              <div className='topic-item-content'>
                <AssignmentIcon style={{ padding: '10px' }} />
                <div className='name-panel topic-detail-item-content'>
                  <Link
                    to={`/assignment/${assignment._id}`}
                    className='name-panel link-panel'
                  >
                    {assignment.name}
                  </Link>
                  <div className='topic-detail-number-question'>
                    {`${renderNumberOfQuestion(
                      assignment.questionIds
                    )} Câu hỏi`}
                  </div>
                </div>
                <div className='topic-item-progress'>
                  {renderProgress(assignment)}
                </div>
              </div>
            </div>
          </div>
        )
      );
    }
    if (path === Routes.TOPIC_SCREEN) {
      return sortArrayByPropertyValue(
        [
          ...topicState.smallTopic.assignmentIds,
          ...topicState.smallTopic.lessonIds,
        ],
        'orderIndex'
      ).map((topic: any) => (
        <div className='topic-item-panel' key={topic._id}>
          <div className='topic-item-left-panel'>
            <div className='topic-item-number'>
              <span>{topic.orderIndex}</span>
            </div>
          </div>
          <div className='topic-item-row-info-panel'>
            <div className='topic-item-content'>
              {topic.videoLink ? (
                <MenuBookIcon style={{ padding: '10px' }} />
              ) : (
                <AlarmIcon style={{ padding: '10px' }} />
              )}
              <div className='name-panel topic-detail-item-content'>
                {topic.videoLink ? (
                  <React.Fragment>
                    <Link
                      to={`/lesson/${topic._id}`}
                      className='name-panel link-panel'
                    >
                      {topic.name}
                    </Link>
                    <div className='topic-detail-number-question'>
                      {`1 Bài giảng / ${topic.documentIds.length} Tài liệu / ${topic.assignmentIds.length} Bài tập`}
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link
                      to={`/assignment/${topic._id}`}
                      className='name-panel link-panel'
                    >
                      {topic.name}
                    </Link>
                    <div className='topic-detail-number-question'>
                      {`${renderNumberOfQuestion(topic.questionIds)} Câu hỏi`}
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div className='topic-item-progress'>{renderProgress(topic)}</div>
            </div>
          </div>
        </div>
      ));
    }
    if (path === Routes.COURSE_SCREEN) {
      return topicState.largeTopic.topicIds.map((topic: any, index: any) => (
        <div className='topic-item-panel' key={topic._id}>
          <div className='topic-item-left-panel'>
            <div className='topic-item-number'>
              <span>{index + 1}</span>
            </div>
          </div>
          <div className='topic-item-row-info-panel'>
            <div className='topic-item-content'>
              <AirplayIcon style={{ padding: '10px' }} />
              <div className='name-panel topic-detail-item-content'>
                <Link
                  to={`/topic/${topic._id}`}
                  className='name-panel link-panel'
                >
                  {topic.name}
                </Link>
                <div className='topic-detail-number-question'>
                  {`${topic.lessonIds.length} Bài học`}
                </div>
              </div>
              <div className='topic-item-progress'>{renderProgress(topic)}</div>
            </div>
          </div>
        </div>
      ));
    }
  };

  const renderProgress = (element: any) => {
    if (element.progressIds.length) {
      return (
        <div style={{ position: 'relative' }}>
          <span className='topic-item-progress-content'>
            {Math.round(element.progressIds[0].percentComplete)}%
          </span>
          <CircularProgress
            variant='static'
            value={Math.round(element.progressIds[0].percentComplete)}
          />
        </div>
      );
    } else return <span>-</span>;
  };

  const renderLoading = () => {
    if (path === Routes.LESSON_SCREEN) {
      return lessonState.isLoading ? <Loading /> : renderHeader();
    }
    if (path === Routes.TOPIC_SCREEN) {
      return topicState.isLoadingSmallTopic ? <Loading /> : renderHeader();
    }
    if (path === Routes.COURSE_SCREEN) {
      return topicState.isLoadingLargeTopic ? <Loading /> : renderHeader();
    }
  };

  const renderHeader = () => {
    return (
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
    );
  };

  return (
    <Paper elevation={1} className='main-block-panel content-block-panel'>
      <div className='main-block-header-panel'>Nội dung bài học</div>
      <div
        className='block main-block-content-panel'
        style={
          path === Routes.COURSE_SCREEN || path === Routes.TOPIC_SCREEN
            ? { maxHeight: '2000px' }
            : {}
        }
      >
        {renderLoading()}
      </div>
    </Paper>
  );
};

export default TopicContent;
