import React, { FunctionComponent } from 'react';
import { convertPieChartData } from '../../utils';

import { Paper } from '@material-ui/core';

const SetPageBottom: FunctionComponent<{ setState: any }> = ({ setState }) => {
  const data = convertPieChartData(setState.termIds);

  return (
    <React.Fragment>
      <div className='set-page-bottom-header-flex'>
        <div className='set-page-bottom-header'>
          Các từ vựng trong học phần này ({setState.termIds.length})
        </div>
      </div>
      {data.map((element: any, index: number) => {
        if (element.termIds.length) {
          return (
            <React.Fragment key={index}>
              <div className='set-page-bottom-header-flex'>
                <div
                  className='set-page-bottom-header'
                  style={{ color: element.color }}
                >{`${element.name} (${element.termIds.length})`}</div>
                <div>{element.subtitle}</div>
              </div>
              {element.termIds.map((term: any) => (
                <Paper
                  key={term._id}
                  elevation={1}
                  className='set-page-bottom-paper'
                >
                  <div className='set-page-bottom-paper-container'>
                    <div className='set-page-bottom-left'>{term.name}</div>
                    <div className='set-page-bottom-right'>
                      {term.definition}
                    </div>
                    <div className='set-page-bottom-image'>
                      {term.imageURL && term.imageURL !== '' && (
                        <img
                          src={term.imageURL}
                          alt='term'
                          height='100%'
                          width='100%'
                        />
                      )}
                    </div>
                  </div>
                </Paper>
              ))}
            </React.Fragment>
          );
        } else return null;
      })}
    </React.Fragment>
  );
};

export default SetPageBottom;
