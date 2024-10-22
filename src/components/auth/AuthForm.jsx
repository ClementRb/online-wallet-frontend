import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AuthForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSubmitForm(e) {
        e.preventDefault();
        onSubmit({
            email,
            password,
        });
    }

    return (
        <div>
            <Form onSubmit={onSubmitForm}>
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

export default AuthForm;

AuthForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
