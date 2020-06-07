import React, { FunctionComponent } from 'react';
import { convertPieChartData } from '../../utils';
import CustomPieChart from '../home/CustomPieChart';

const SetPageRight: FunctionComponent<{ setState: any }> = ({ setState }) => {
  return (
    <CustomPieChart
      data={convertPieChartData(setState.current.termIds)}
      height={236}
      outerRadius={70}
      isAnimationActive={true}
    />
  );
};

export default SetPageRight;
