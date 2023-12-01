import React from 'react'
import { Bar, Bubble, Chart, Doughnut, Line, Pie, PolarArea, Radar, Scatter,    } from "react-chartjs-2"



const data = {
  labels: ['india', 'japan', 'March', 'April'],
  datasets: [
    {
      label: 'Total Registered Users ',
      data: [65, 59, 80, 81, ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 99, 132, 1)'
      ],
      borderWidth: 1,
    },
  ],
};




const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};



function MyChart() {



  return (
    <PolarArea   data={data} className='chart' options={options}  />
  )
}

export default MyChart

