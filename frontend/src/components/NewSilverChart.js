import React, { useState, useEffect, useMemo } from 'react';
import { getSilverData } from '../services/trade.api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';

ChartJS.register({
    Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend
})

export default function NewSilverChart() {
    const [price, setPrice] = useState([]);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Gold Price',
                // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13],
                data: price,
                backgroundColor: 'red',
                borderColor: 'gray',
                pointBorderColor: 'gray',
                fill: true,
                tension: 0.1
            }
        ]
    }

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                max: 100.0,
                min: 0.1,
                ticks: {
                    stepSize: 0.1
                }
            }
        }
    }

    useEffect(() => {
        getSilverData().then(result => {
            const data = result.data.data[0];
            getData(data);
        }).catch(err => err)
    }, []);

    const getData = (data) => {
        const tempPrice = [];
        let ignore = 0;
        for (let i in data) {
            if (ignore++ != 0) {
                const tempData = data[i];
                // console.log(tempData);
                for (let j in tempData) {
                    // console.log(tempData[j].price);
                    tempPrice.push(tempData[j].price)
                }
            }
        }
        // console.log(tempPrice);
        setPrice(tempPrice);
    }

    return (
        <>
            <div style={{ width: '1300px', height: '' }}>
                <Line data={data} options={options} />
            </div>
        </>
    )
}