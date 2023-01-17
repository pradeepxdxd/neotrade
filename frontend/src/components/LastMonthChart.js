import React, { useEffect, useState } from 'react'
import { getGoldData } from '../services/trade.api';

export default function LastMonthChart() {
    const fullMonth = ['Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Nov', 'Dec'];
    const [goldData, setGoldData] = useState([]);

    const [dates, setDates] = useState([]);
    const [price, setPrice] = useState([]);

    let curr_Month = [];
    let prev_Month = [];

    useEffect(() => {
        getGoldData().then(result => {
            setGoldData(result.data.data[0]);
        }).catch(err => err)
    }, [])

    const month = new Date().getMonth();
    const date = new Date().getDate();

    const monthlyData = [];

    let m = 0;
    for(let temp in goldData){
        if(m++ == 0){}
        else{
            monthlyData.push(goldData[temp]);
        }
    }

    // console.log(monthlyData[2]);

    let i = 0;
    for(let data in monthlyData){
        if(i == 0){
            curr_Month = [monthlyData[data]];
            prev_Month = [monthlyData[11]]
            i++;
        }
        else if(month == i){
            curr_Month = [monthlyData[i]];
            prev_Month = [monthlyData[i-1]]
            i++;
        }
    }


    // for(let m in month){
    //     console.log(`date :- ${m} ||| price :- ${month[m].price}`);
    // }

    let tempCurDate = date;
    // console.log(curr_Month[0].length - tempCurDate);
    const curMonLength = curr_Month.length;
    const curPrevLength = prev_Month.length;

    console.log(curMonLength);
    console.log(curPrevLength);
    // console.log(prev_Month[0].length - (curr_Month[0].length - tempCurDate));
    // let tempPrevStartDate = prev_Month[0].length - (curr_Month[0].length - tempCurDate);

    // console.log(tempCurDate);

    return (
        <div>LastMonthChart</div>
    )

}