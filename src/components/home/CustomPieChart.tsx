import React, { FunctionComponent } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const CustomPieChart: FunctionComponent<{
  data: any;
  height: any;
  outerRadius: any;
  isAnimationActive: any;
}> = ({ data, height, outerRadius, isAnimationActive }) => {
  return (
    <ResponsiveContainer width='100%' height={height}>
      <PieChart width={730} height={height}>
        <Pie
          dataKey='count'
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={outerRadius}
          label
          isAnimationActive={isAnimationActive}
        >
          {data.map((element: any, index: number) => (
            <Cell key={`cell-${index}`} fill={element.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
