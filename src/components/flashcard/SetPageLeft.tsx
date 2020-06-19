import React, { FunctionComponent, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { isPermittedToEdit } from '../../utils';

import { Grid } from '@material-ui/core';
import {
  RotateLeft as RotateLeftIcon,
  MenuBook as MenuBookIcon,
  Hearing as HearingIcon,
  Edit as EditIcon,
  FilterNone as FilterNoneIcon,
  Check as CheckIcon,
} from '@material-ui/icons';

const SetPageLeft: FunctionComponent<{
  history: any;
  setState: any;
  authState: any;
}> = ({ history, setState, authState }) => {
  const [isCopy, setIsCopy] = useState(false);

  const renderCopyToClipboard = () => {
    if (isCopy) {
      return (
        <div className='set-page-filp-card-flex'>
          <CheckIcon
            htmlColor='#4caf50'
            className='set-page-filp-card-flex-icon'
          />
          Sao chép link
        </div>
      );
    } else {
      return (
        <CopyToClipboard
          text={window.location.href}
          onCopy={() => setIsCopy(true)}
        >
          <div className='set-page-filp-card-flex'>
            <FilterNoneIcon
              color='primary'
              className='set-page-filp-card-flex-icon'
            />
            Sao chép link
          </div>
        </CopyToClipboard>
      );
    }
  };

  const renderEditFeature = () => {
    if (isPermittedToEdit(authState, setState))
      return (
        <div
          className='set-page-filp-card-flex'
          onClick={() => handleChangeLink(3)}
        >
          <EditIcon color='primary' className='set-page-filp-card-flex-icon' />
          Chỉnh sửa
        </div>
      );
    else return null;
  };

  const rightItemArray = [
    {
      title: 'Học thẻ bài',
      icon: (
        <RotateLeftIcon
          color='primary'
          className='set-page-filp-card-flex-icon'
        />
      ),
    },
    {
      title: 'Luyện viết',
      icon: (
        <MenuBookIcon
          color='primary'
          className='set-page-filp-card-flex-icon'
        />
      ),
    },
    {
      title: 'Luyện nghe',
      icon: (
        <HearingIcon color='primary' className='set-page-filp-card-flex-icon' />
      ),
    },
  ];

  const handleChangeLink = (index: any) => {
    if (index === 0) history.push(`/set/${setState._id}/study`);
    else if (index === 1) history.push(`/set/${setState._id}/write`);
    else if (index === 2) history.push(`/set/${setState._id}/listen`);
    else if (index === 3) history.push(`/set/${setState._id}/edit`);
  };

  return (
    <Grid item xs={2} className='set-page-filp-card-icon'>
      <div className='set-page-left-header'>{setState.name}</div>
      {rightItemArray.map((item: any, index: number) => (
        <div
          key={index}
          className='set-page-filp-card-flex'
          onClick={() => handleChangeLink(index)}
        >
          {item.icon}
          {item.title}
        </div>
      ))}
      {renderEditFeature()}
      {renderCopyToClipboard()}
    </Grid>
  );
};

export default SetPageLeft;
