import React, { FunctionComponent } from 'react';
import '../resources/scss/component/banner.scss';

const Banner: FunctionComponent<{ topicState: any }> = ({ topicState }) => {
  return (
    <div className='main-banner'>
      {topicState.isLoadingLargeTopic ? null : (
        <div className='banner-content-detail'>
          <div className='banner-content-text'>
            <h1>{topicState.largeTopic.name}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
