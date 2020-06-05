import React, { FunctionComponent } from 'react';
import { convertPieChartData } from '../../utils';
import CustomPieChart from '../home/CustomPieChart';

const SetPageRight: FunctionComponent<{ setState: any }> = ({ setState }) => {
  return (
    <CustomPieChart data={convertPieChartData(setState.current.termIds)} />
  );
};

export default SetPageRight;
