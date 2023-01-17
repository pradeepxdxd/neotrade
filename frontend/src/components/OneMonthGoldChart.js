import React, { useEffect, useState } from 'react'
import { getGoldData } from '../services/trade.api'

export default function OneMonthGoldChart() {

    const allMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const [date, setDate] = useState([]);
    const [price, setPrice] = useState([]);

    const [goldData, setGoldData] = useState([]);
    const [monthData, setMonthData] = useState([]);

    const month = new Date().getMonth() + 1;

    const getMonth = allMonth[new Date().getMonth()];

    useEffect(() => {
        getGoldData()
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

    }, [goldData])

    const tempPrice = [];
    const tempDate = [];

    for(let data in monthData){
        // console.log(`Jan ${parseInt(data) + 1} & Price :- ${monthData[data].price}`);
        tempDate.push(`${getMonth} ` + (parseInt(data) + 1));
        tempPrice.push(monthData[data].price);
    }

    console.log(tempDate);
    console.log(tempPrice);

    return (
        <>
            lklkllklk
        </>
    )
}
