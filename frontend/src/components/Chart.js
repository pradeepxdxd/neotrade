import React, { useState, useEffect, useMemo } from 'react';
import { getGoldInfo } from '../services/trade.api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';

ChartJS.register({
  Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend
})

export default function Chart() {
  const [key, setKey] = useState([]);
  const [value, setValue] = useState([]);

  const data = {
    labels: key,
    datasets: [
      {
        label: 'Gold And Silver',
        data: value,
        backgroundColor: 'red',
        borderColor: 'gray',
        pointBorderColor: 'gray',
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
        // beginAtZero : true,
        // ticks : {
        //   // stepSize : 1
        // }
      }
    }
  }

  useEffect(() => {
    const tempKey = [];
    const tempValue = [];
    getGoldInfo().then(data => {
      const jsonData = data.data.result;
      const obj = JSON.parse(jsonData);
      for (let i in obj) {
        tempKey.push(i);
        tempValue.push(obj[i]);
      }
      setKey(tempKey);
      setValue(tempValue);
    }).catch(err => console.log(err))
  }, []);

  useEffect(() => {
    const tempKey = [];
    const tempValue = [];
    getGoldInfo().then(data => {
      const jsonData = data.data.result;
      const obj = JSON.parse(jsonData);
      for (let i in obj) {
        tempKey.push(i);
        tempValue.push(obj[i]);
      }
      setKey(tempKey);
      setValue(tempValue);
    }).catch(err => console.log(err))
  }, [data]);

  return (
    <>
      <div style={{ width: '800px', height: '10000px' }}>
        <Line data={data} options={options} />
      </div>
    </>
  )
}
