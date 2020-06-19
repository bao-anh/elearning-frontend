import React, { FunctionComponent } from 'react';

import { Button } from '@material-ui/core';
import { EmojiEvents as CupIcon } from '@material-ui/icons';

const StudyPageComplete: FunctionComponent<{
  fetchStudyBySetId: any;
  fetchAllStudy: any;
  onError: any;
  match: any;
}> = ({ fetchStudyBySetId, fetchAllStudy, onError, match }) => {
  const handleResetStudy = () => {
    if (match.params.id === 'all') fetchAllStudy(onError);
    else fetchStudyBySetId(match.params.id, onError);
  };

  return (
    <React.Fragment>
      <div className='write-page-content'>
        <CupIcon htmlColor='#fbc02d' fontSize='large' />
        <div>Bạn đã học hết các từ vựng trong học phần này</div>
      </div>
      <div className='text-right'>
        <Button
          onClick={() => handleResetStudy()}
          variant='contained'
          color='primary'
        >
          Bắt đầu lại
        </Button>
      </div>
    </React.Fragment>
  );
};

export default StudyPageComplete;
