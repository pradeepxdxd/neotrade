import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withdrawAmount } from '../services/wallet.api'

export default function WithdrawAmount() {
    const [amount, setAmount] = useState('');

    const handleChange = (e) => {
        setAmount(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        withdrawAmount('63d1af1579464e9921d262f4', {amount})
            .then(data => {
                console.log(data);
            }).catch(err => {
                console.log(err);
        })
    }

    return (
        <>
            <section className='container'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Withdraw Amount</Form.Label>
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
