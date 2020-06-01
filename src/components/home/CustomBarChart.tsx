import React, { FunctionComponent } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

const CustomeBarChart: FunctionComponent<{
  data: any;
  color: any;
  name: any;
}> = ({ data, color, name }) => {
  return (
    <ResponsiveContainer width='100%' height={280}>
      <BarChart data={data} barSize={30}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar name={name} dataKey='count' fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomeBarChart;
