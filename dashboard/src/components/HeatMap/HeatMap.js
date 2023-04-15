import React from 'react'

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale, // y
    Tooltip,
    Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale, // y
    Tooltip,
    Legend
)

const HeatMap = () => {
    const data = {
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [
            {
                label: '369',
                data: [3, 6, 9],
                backgroundColor: 'acqua',
                borderColor: 'black',
                borderWidth: 1,
            },
            {
                label: '342',
                data: [3, 4, 2],
                backgroundColor: 'green',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    }

    const options = {

    }

    return (
        <div className='w-3/4 h-3/4'>
            <Bar
                data={data}
                options={options}
            ></Bar>
        </div>
    )
}

export default HeatMap