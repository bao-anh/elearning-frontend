import React, { FunctionComponent } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';

const CustomRadarChart: FunctionComponent<{ data: any; name: any }> = ({
  data,
  name,
}) => {
  return (
    <ResponsiveContainer width='100%' height={280}>
      <RadarChart outerRadius={90} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey='subject' />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name={name}
          dataKey='A'
          stroke='#8884d8'
          fill='#8884d8'
          fillOpacity={0.6}
        />
        <Tooltip />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CustomRadarChart;
