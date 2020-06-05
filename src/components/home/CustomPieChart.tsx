import React, { FunctionComponent } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const CustomPieChart: FunctionComponent<{ data: any }> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={236}>
      <PieChart width={730} height={250}>
        <Pie
          dataKey='count'
          data={data}
          cx='50%'
          cy='50%'
          outerRadius={80}
          label
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
