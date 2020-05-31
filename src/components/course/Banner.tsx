import React, { FunctionComponent } from 'react';
import '../../resources/scss/component/banner.scss';

const Banner: FunctionComponent<{ topicState: any }> = ({ topicState }) => {
  return (
    <div className='main-banner'>
      {topicState.isLoadingLargeTopic ? null : (
        <div className='banner-content-detail'>
          <div className='banner-content-text'>
            <h2 style={{ marginBottom: '0' }}>{topicState.largeTopic.name}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
