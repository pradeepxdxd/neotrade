import React, { useEffect, useState } from 'react';
import { getGoldDataByMonthID } from '../services/trade.api';

export default function CurrentMarketPriceOfGold() { 
    const [price, setPrice] = useState(0);
    console.log();
    console.log(new Date().getDate() + 1);
    useEffect(() => {
        getGoldDataByMonthID(new Date().getMonth()).then(result => {
            setPrice(result.data.data[new Date().getDate() + 1].price);
            console.log(result.data.data[new Date().getDate() + 1]);

        }).catch(err => err);
    }, []);
    return (
        <>
            <h1>Today's Gold Price Rs. {price}</h1>
        </>
    )
}
