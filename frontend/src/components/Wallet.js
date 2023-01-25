import React, { useState } from 'react'

export default function Wallet() {
    const [ChangeBalance, setChangeBalance] = useState(0);
    const [balance, setBalance] = useState(100)
    const HandleChange = (e) => {

        const { value, name } = e.target
        switch (name) {
            case 'add': setChangeBalance(parseInt(value))
                break;
            case 'withdraw': setChangeBalance(parseInt(-value))
                break;

        }
    }
    const Submit = () => {
        setBalance(balance + ChangeBalance)
        setChangeBalance(0)
    }
    return (
        <div className='  justify-content-center'>
            <div className=' d-flex justify-content-center'>
                <h1> Wallet</h1>
            </div>
            <div className='row'>
                <div className=' border-right bg-light'>
                    <h2> Current Balance - {balance}</h2>
                    <hr />

                    <div className='form-group'>
                        <label className=''> Add amount</label>
                        <input className='form-control' type="number" name="add"
                            onChange={HandleChange} required ></input>
                        <button onClick={Submit} className='btn btn-success shadow w-100'> Add  </button>
                    </div>

                    <div className='form-group'>
                        <label className=''> Withdraw amount</label>
                        <input className='form-control' type="number" name="withdraw"
                            onChange={HandleChange} required ></input>
                        <button className='btn btn-success shadow w-100' onClick={Submit}> Withdraw </button>
                    </div>
                </div>
            </div>
        </div>
    )
}