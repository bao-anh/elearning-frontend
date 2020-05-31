import React, { FunctionComponent } from 'react';
import { sortArrayByPropertyValue } from '../../utils';
import '../../resources/scss/toeic/leaderboard.scss';
import Routes from '../../routes';

import { CircularProgress } from '@material-ui/core';
import { School as SchoolIcon } from '@material-ui/icons';

const LeaderBoard: FunctionComponent<{ leaderboard: any; match: any }> = ({
  leaderboard,
  match,
}) => {
  const sortedLeaderboard = sortArrayByPropertyValue(
    leaderboard,
    'percentComplete'
  ).reverse();

  const handleRenderStyle = (index: number) => {
    if (index === 0) return { color: '#ffea00' };
    else if (index === 1) return { color: '#e0e0e0' };
    else if (index === 2) return { color: '#ffb300' };
    else return {};
  };

  return (
    <React.Fragment>
      {sortedLeaderboard.map((children: any, index: number) => (
        <div key={children.userId._id} className='leaderboard-panel-item'>
          {index < 3 ? (
            <SchoolIcon style={handleRenderStyle(index)} fontSize='large' />
          ) : null}
          <div className='leaderboard-panel-text'>{children.userId.name}</div>
          <div className='leaderboard-item-progress'>
            <div style={{ position: 'relative' }}>
              {match.path === Routes.TEST_SCREEN ? (
                isNaN(Number(match.params.part)) ? (
                  <React.Fragment>
                    <span
                      className='leaderboard-item-progress-content'
                      style={{ right: '9px' }}
                    >
                      {Math.round(children.currentScore)}
                    </span>
                    <CircularProgress
                      variant='static'
                      value={Math.round((100 * children.currentScore) / 990)}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span className='leaderboard-item-progress-content'>
                      {Math.round(children.percentComplete)}%
                    </span>
                    <CircularProgress
                      variant='static'
                      value={Math.round(children.percentComplete)}
                    />
                  </React.Fragment>
                )
              ) : (
                <React.Fragment>
                  <span
                    className='leaderboard-item-progress-content'
                    style={{ right: '9px' }}
                  >
                    {Math.round(children.currentScore)}
                  </span>
                  <CircularProgress
                    variant='static'
                    value={Math.round((100 * children.currentScore) / 990)}
                  />
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default LeaderBoard;
