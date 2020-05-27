import React, { FunctionComponent } from 'react';
import Loading from '../common/Loading';
import '../../resources/scss/component/reference.scss';

import { Paper } from '@material-ui/core';
import {
  Description as DescriptionIcon,
  GetApp as GetAppIcon,
} from '@material-ui/icons';

const Reference: FunctionComponent<{
  lessonState: any;
}> = ({ lessonState }) => {
  return (
    <Paper elevation={1} className='main-block-panel reference-panel'>
      <div className='main-block-header-panel'>Tài liệu tham khảo</div>
      <div className='block main-block-content-panel'>
        {lessonState.isLoading ? (
          <Loading />
        ) : (
          lessonState.data.documentIds.map((reference: any) => (
            <div className='reference-item' key={reference._id}>
              <DescriptionIcon className='reference-item-icon' />
              <div className='reference-item-content'>
                <a href={reference.link} className='link' target='blank'>
                  {reference.name}
                </a>
              </div>
              <GetAppIcon className='reference-item-icon' />
            </div>
          ))
        )}
      </div>
    </Paper>
  );
};

export default Reference;
