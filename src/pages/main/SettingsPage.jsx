import React, { useState, useEffect } from 'react';
import userService from '../../services/userService.js';
import { Form, Col, Button, Container, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

const SettingsPage = () => {
    const [user, setUser] = useState(null);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        setFirstname(user.user.firstname);
        setLastname(user.user.lastname);
        setEmail(user.user.email);
        setUser(user);
    }, []);

    function onSubmit(e) {
        e.preventDefault();

        const params = {
            firstname,
            lastname,
            email,
            password,
        };
        userService.editUser(user._id, params).then(
            () => {
                toast.success('User updated', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
            (err) => {
                toast.error(err.response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            },
        );
    }

    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <div style={{ margin: '20px' }}>
                        <h1>Edit infos</h1>
                    </div>
                    <Form onSubmit={onSubmit}>
                        <Form.Group as={Col} controlId="formGridFirtName">
                            <Form.Label>Firstname</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default SettingsPage;
