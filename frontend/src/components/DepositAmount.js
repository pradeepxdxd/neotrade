import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { depositAmount } from '../services/wallet.api';

export default function DepositAmount() {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(amount);
        depositAmount("63d1af1579464e9921d262f4", { amount })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    return (
        <>
            <section className='container'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Deposite Amount</Form.Label>
                        <Form.Control type="text" placeholder="Enter Amount" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </section>
        </>
    )
}