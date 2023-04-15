import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const AggregationChart = () => {
  return (
    <div className="bg-gray-200 h-full w-full flex justify-center items-center">
      <div className="w-1/2 h-1/2">
        <Line data={data} />
      </div>
    </div>
  );
};

export default AggregationChart;
