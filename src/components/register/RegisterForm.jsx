import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RegisterForm = ({ onSubmit }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSubmitForm(e) {
        e.preventDefault();
        onSubmit({
            firstname,
            lastname,
            email,
            password,
        });
    }

    return (
        <div>
            <Form onSubmit={onSubmitForm}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirtName">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default RegisterForm;

RegisterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
