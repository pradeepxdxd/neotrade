import React, { useEffect, useState } from 'react';
import { getSilverData } from '../services/trade.api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';

export default function OneMonthSilverChart() {

    const allMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [date, setDate] = useState([]);
    const [price, setPrice] = useState([]);

    const [goldData, setGoldData] = useState([]);
    const [monthData, setMonthData] = useState([]);

    const month = new Date().getMonth() + 1;

    const getMonth = allMonth[new Date().getMonth()];

    useEffect(() => {
        getSilverData()
            .then(result => {
                setGoldData(result.data.data[0])
            })
            .catch(err => err);
    }, [])

    useEffect(() => {

        let day = 0;
        for (let i in goldData) {
            if (day++ == month) {
                setMonthData(goldData[i]);
            }
        }

        const tempPrice = [];
        const tempDate = [];

        for (let data in monthData) {
            // console.log(`Jan ${parseInt(data) + 1} & Price :- ${monthData[data].price}`);
            tempDate.push(`${getMonth} ` + (parseInt(data) + 1));
            tempPrice.push(monthData[data].price);
        }

        setDate(tempDate);
        setPrice(tempPrice);

    }, [goldData]);

    const data = {
        labels: date,
        datasets: [
            {
                label: 'Silver Price',
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
                beginAtZero: true,
                ticks: {
                    stepSize: 0.1
                }
            }
        }
    }

    return (
        <>
            <div style={{width:'1300px', height:'1000px'}}>
                <Line data={data} options={options} />
            </div>
        </>
    )
}