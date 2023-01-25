import React, { useEffect, useState } from 'react';
import { getGoldData, getGoldDataByMonth } from '../services/trade.api';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';

ChartJS.register({
    Title, Tooltip, LineElement, CategoryScale, LinearScale, PointElement, Legend
})

const options = [
    { value: 0, label: 'Jan' },
    { value: 1, label: 'Feb' },
    { value: 2, label: 'Mar' },
    { value: 3, label: 'Apr' },
    { value: 4, label: 'May' },
    { value: 5, label: 'Jun' },
    { value: 6, label: 'Jul' },
    { value: 7, label: 'Aug' },
    { value: 8, label: 'Sep' },
    { value: 9, label: 'Oct' },
    { value: 10, label: 'Nov' },
    { value: 11, label: 'Dec' },
]

const option = {
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

export default function TestGoldByMonth() {
    const [param, setParam] = useState(0);
    const [goldData, setGoldData] = useState({});
    const [monthName, setMonthName] = useState('');
    const [price, setPrice] = useState([]);
    const [date, setDate] = useState([]);
    const data = {
        labels: date,
        datasets: [
            {
                label: 'Gold Price',
                data: price,
                backgroundColor: 'gray',
                borderColor: 'red',
                pointBorderColor: 'yellow',
                fill: true,
                tension: 0.1
            }
        ]
    };

    useEffect(() => {
        getGoldData().then(result => {
            setGoldData(result.data.data[0]);
            const allData = result.data.data[0];
            const getMonth = new Date().getMonth() + 1;
            let checkMonth = 0;
            for (let month in allData) {
                if (getMonth == checkMonth++) {
                    setMonthName(month);
                    const monthPrice = allData[month];
                    const tempDate = [];
                    const tempPrice = [];
                    for (let curMonthPrice in monthPrice) {
                        tempDate.push(`${month} ${parseInt(curMonthPrice) + 1}`);
                        tempPrice.push(monthPrice[curMonthPrice].price);
                    }
                    setDate(tempDate);
                    setPrice(tempPrice);
                }
            }
        })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const updatedMonthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        getGoldDataByMonth(param)
            .then(result => {
                const allData = result.data.data;
                let tempDate = [];
                let tempPrice = [];
                for (let key in allData) {
                    tempDate.push(`${updatedMonthName[param]} ${parseInt(key) + 1}`);
                    tempPrice.push(allData[key].price);
                }

                setDate(tempDate);
                setPrice(tempPrice);
            })
            .catch(err => err);
    }, [param]);

    const handleChange = (e) => {
        const val = e.target.value;
        options.forEach(item => {
            if (item.label == val) {
                setParam(item.value);
            }
        })
    }

    return (
        <>
            <div className='container'>
                <section style={{ width: '500px' }}>
                    <select onChange={handleChange}>
                        {
                            options.map((opt, i) => <option key={i}>{opt.label}</option>)
                        }
                    </select>
                </section>

                <div style={{ width: '1300px', height: '700px' }}>
                    <Line data={data} options={option} />
                </div>
            </div>
        </>
    )
}
