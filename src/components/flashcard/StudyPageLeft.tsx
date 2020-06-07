import React, { FunctionComponent } from 'react';

import { Paper } from '@material-ui/core';
import { ImportExport as ImportExportIcon } from '@material-ui/icons';

const StudyPageLeft: FunctionComponent<{ studyState: any }> = ({
  studyState,
}) => {
  const { remain, familiar, mastered } = studyState;
  return (
    <Paper elevation={1} className='practice-page-container'>
      <div className='flex-column full-height'>
        <div className='xs4-font'>{remain.length}</div>
        <div className='xs4-font'>Còn lại</div>
        <ImportExportIcon
          fontSize='large'
          className='study-page-left-icon'
          htmlColor='#aaaaaa'
        />
        <div className='xs4-font' style={{ color: '#8bc34a' }}>
          {familiar.length}
        </div>
        <div className='xs4-font'>Quen thuộc</div>
        <ImportExportIcon
          fontSize='large'
          className='study-page-left-icon'
          htmlColor='#aaaaaa'
        />
        <div className='xs4-font' style={{ color: '#4caf50' }}>
          {mastered.length}
        </div>
        <div className='xs4-font'>Nắm chắc</div>
      </div>
    </Paper>
  );
};

export default StudyPageLeft;
