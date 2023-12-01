import React from 'react'
import { Doughnut  } from "react-chartjs-2"



const data = {
  labels: ["total  users"],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(0, 7, 61, 0.3)',
      
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        
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



function Chart() {



  return (
    <Doughnut data={data} className='chart' options={options}  />
  )
}

export default Chart


