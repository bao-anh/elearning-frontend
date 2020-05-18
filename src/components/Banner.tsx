import React, { FunctionComponent } from 'react';
import '../resources/scss/component/banner.scss';

const Banner: FunctionComponent<{}> = () => {
  return (
    <div className='main-banner'>
      <div className='banner-content-detail'>
        <div className='banner-content-text'>
          <h1>Khóa học toiec 450-650</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
