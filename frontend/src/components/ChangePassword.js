import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const {id, token} = useParams();

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit =(e) => {
        e.preventDefault();
        console.log(password);
    }

    return (
        <>
            <section className='container'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </section>
        </>
    )
}
