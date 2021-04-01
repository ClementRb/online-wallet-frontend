import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EditUserModal = ({ show, onClose, onConfirm, user }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            setFirstname(user.firstname);
            setLastname(user.lastname);
            setEmail(user.email);
        }
    }, [user]);

    function onSubmit(e) {
        e.preventDefault();

        const params = {
            firstname,
            lastname,
            email,
            password,
        };

        onConfirm(params);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group as={Col} controlId="formGridFirtName">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
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
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Edit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;

EditUserModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};
