import React, { FunctionComponent } from 'react';

import { Button } from '@material-ui/core';
import { EmojiEvents as CupIcon } from '@material-ui/icons';

const StudyPageComplete: FunctionComponent<{
  fetchStudyBySetId: any;
  onError: any;
  match: any;
}> = ({ fetchStudyBySetId, onError, match }) => {
  return (
    <React.Fragment>
      <div className='write-page-content'>
        <CupIcon htmlColor='#fbc02d' fontSize='large' />
        <div>Bạn đã học hết các từ vựng trong học phần này</div>
      </div>
      <div className='text-right'>
        <Button
          onClick={() => fetchStudyBySetId(match.params.id, onError)}
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
