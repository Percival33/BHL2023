import React from 'react'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x
  LinearScale, // y
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale, // x
  LinearScale, // y
  PointElement,
  Legend,
  Tooltip
)

const OrderChart = () => {

  const data = {
    labels: ['Mon', 'Tue', 'Wed'],
    datasets: [
      {
        label: '369',
        data: [3, 6, 4],
        backgroundColor: 'acqua',
        borderColor: 'black',
        pointBorderColor: 'red',
        fill: true,
        tension: 0.4
      },
      {
        label: '369',
        data: [3, 3, 3],
        backgroundColor: 'acqua',
        borderColor: 'black',
        pointBorderColor: 'red',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const options = {
    plugins: {
      legend: true
    },
    scales: {
      y: {
        min: 3,
        max: 9
      }
    }
  }

  return (
    <div className='w-3/4 h-3/4'>
      <Line
        data={data}
        options={options}
      ></Line>
    </div>
  )
}

export default OrderChart