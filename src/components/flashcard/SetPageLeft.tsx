import React, { FunctionComponent } from 'react';

import { Grid } from '@material-ui/core';
import {
  RotateLeft as RotateLeftIcon,
  MenuBook as MenuBookIcon,
  Hearing as HearingIcon,
  Edit as EditIcon,
} from '@material-ui/icons';

const SetPageLeft: FunctionComponent<{ history: any; setState: any }> = ({
  history,
  setState,
}) => {
  const rightItemArray = [
    {
      title: 'Học',
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
    {
      title: 'Chỉnh sửa',
      icon: (
        <EditIcon color='primary' className='set-page-filp-card-flex-icon' />
      ),
    },
  ];

  const handleChangeLink = (index: any) => {
    if (index === 0) history.push(`/set/${setState._id}/study`);
    else if (index === 1) history.push(`/set/${setState._id}/write`);
    else if (index === 2) history.push(`/set/${setState._id}/listening`);
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
    </Grid>
  );
};

export default SetPageLeft;
