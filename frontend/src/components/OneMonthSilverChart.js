import React, { useEffect, useState } from 'react';
import { getSilverData } from '../services/trade.api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';
import Dropdown from 'react-bootstrap/Dropdown';

export default function OneMonthSilverChart() {

    const [param, setParam] = useState(null);

    const allMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [date, setDate] = useState([]);
    const [price, setPrice] = useState([]);

    const [silverData, setSilverData] = useState([]);
    const [monthData, setMonthData] = useState([]);

    // const month = new Date().getMonth() + 1;
    // const getMonth = allMonth[new Date().getMonth()];

    let month;
    let getMonth;

    if(param ==null){
        month = new Date().getMonth() + 1;
        getMonth = allMonth[new Date().getMonth()];
    }
    else{
        month = param;
        getMonth = allMonth[param];
    }

    useEffect(() => {
        getSilverData()
            .then(result => {
                setSilverData(result.data.data[0])
            })
            .catch(err => err);
    }, [])

    useEffect(() => {

        let day = 0;
        for (let i in silverData) {
            if (day++ == month) {
                setMonthData(silverData[i]);
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

    }, [silverData, param]);

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

    const handleDay = (value) => {
        setParam(value);
    }

    console.log(param);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                    Month
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDay(0)}>Jan</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(1)}>Feb</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(2)}>Mar</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(3)}>Apr</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(4)}>May</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(5)}>Jun</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(6)}>Jul</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(7)}>Aug</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(8)}>Sep</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(9)}>Oct</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(10)}>Nov</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDay(11)}>Dec</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div style={{ width: '1300px', height: '1000px' }}>
                <Line data={data} options={options} />
            </div>
        </>
    )
}