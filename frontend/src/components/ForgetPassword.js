import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { sendpasswordlink } from '../services/auth.api';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        try{
            e.preventDefault();
            sendpasswordlink({email})
                .then(data => {
                    console.log(data);
                }).catch(err => console.log('err from axios'));
        }
        catch(err){
            console.log('err from catch...');
        }
    }

    return (
        <>
            <section className='container'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </section>
        </>
    )
}