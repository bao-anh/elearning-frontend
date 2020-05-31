import React, { FunctionComponent } from 'react';
import '../../resources/scss/toeic/toeicContent.scss';
import { Link } from 'react-router-dom';
import Part1Image from '../../resources/images/part1.png';
import Part2Image from '../../resources/images/part2.png';
import Part3Image from '../../resources/images/part3.png';
import Part4Image from '../../resources/images/part4.png';
import Part5Image from '../../resources/images/part5.png';
import Part6Image from '../../resources/images/part6.png';
import Part7Image from '../../resources/images/part7.png';

import { LinearProgress, Button } from '@material-ui/core';

const ToeicContent: FunctionComponent<{ toeicState: any; scaleState: any }> = ({
  toeicState,
  scaleState,
}) => {
  const titleArray = [
    {
      header: 'Part 1',
      imageSrc: Part1Image,
      content: 'Mô tả hình ảnh',
    },
    {
      header: 'Part 2',
      imageSrc: Part2Image,
      content: 'Hỏi - Đáp',
    },
    {
      header: 'Part 3',
      imageSrc: Part3Image,
      content: 'Đoạn hội thoại',
    },
    {
      header: 'Part 4',
      imageSrc: Part4Image,
      content: 'Bài nói chuyện ngắn',
    },
    {
      header: 'Part 5',
      imageSrc: Part5Image,
      content: 'Câu không hoàn chỉnh',
    },
    {
      header: 'Part 6',
      imageSrc: Part6Image,
      content: 'Hoàn thành đoạn văn',
    },
    {
      header: 'Part 7',
      imageSrc: Part7Image,
      content: 'Đoạn văn đơn - kép',
    },
  ];

  const { minScore, targetScore } = toeicState.data;
  const minProgressReading = scaleState.reading.indexOf(
    Math.round(minScore / 2 / 5) * 5
  );
  const minProgressListeing = scaleState.listening.indexOf(
    Math.round(minScore / 2 / 5) * 5
  );
  const targetProgressReading = scaleState.reading.indexOf(
    Math.round(targetScore / 2 / 5) * 5
  );
  const targetProgressListeing = scaleState.listening.indexOf(
    Math.round(targetScore / 2 / 5) * 5
  );

  const renderStyle = (part: any) => {
    if (part.partNumber <= 4) {
      const progress = Math.round(
        ((part.progressIds[0].percentComplete - minProgressListeing) /
          (targetProgressListeing - minProgressListeing)) *
          100
      );
      return progress > 100 ? 100 : progress < 0 ? 0 : progress;
    } else {
      const progress = Math.round(
        ((part.progressIds[0].percentComplete - minProgressReading) /
          (targetProgressReading - minProgressListeing)) *
          100
      );
      return progress > 100 ? 100 : progress < 0 ? 0 : progress;
    }
  };

  return (
    <React.Fragment>
      {toeicState.data.partIds.map((part: any, index: number) => (
        <div key={part._id} className='progress-panel-container'>
          <div className='progress-panel-title'>
            <div className='progress-panel-title-image'>
              <img src={titleArray[index].imageSrc} alt='title' />
            </div>
            <div className='progress-panel-text'>
              <div className='progress-panel-title-header'>
                {titleArray[index].header}
              </div>
              <div className='progress-panel-title-content'>
                {titleArray[index].content}
              </div>
            </div>
          </div>
          <div className='progress-panel-user-progress-container'>
            <div className='progress-panel-layout' />
            <div className='progress-panel-bar-wrap'>
              <LinearProgress
                variant='determinate'
                value={renderStyle(part)}
                classes={{ root: 'progress-panel-bar' }}
              />
              <div className='progress-panel-min-score-part'>
                {part.partNumber <= 4
                  ? `${minProgressListeing}%`
                  : `${minProgressReading}%`}
              </div>
              <div
                className='progress-panel-current-score-part'
                style={{
                  left: `calc(${renderStyle(part)}% - ${
                    ((32 - 9) * renderStyle(part)) / 100 + 9
                  }px)`,
                }}
              >
                {`${part.progressIds[0].percentComplete}%`}
              </div>
              <div className='progress-panel-target-score-part'>
                {part.partNumber <= 4
                  ? `${targetProgressListeing}%`
                  : `${targetProgressReading}%`}
              </div>
            </div>
            <div className='toeic-content-target-score-text'>
              Mục tiêu hiện tại
            </div>
            <div className='toeic-content-current-score-text'>Cột mốc</div>
          </div>
          <Button
            variant='contained'
            color='primary'
            className='progress-panel-button'
          >
            <Link to={`/test/${part.partNumber}`} className='button-link'>
              Luyện
            </Link>
          </Button>
        </div>
      ))}
    </React.Fragment>
  );
};

export default ToeicContent;
