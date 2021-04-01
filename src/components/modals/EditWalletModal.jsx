import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EditWalletModal = ({ show, onClose, onConfirm, wallet }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        if (wallet) {
            setName(wallet.name);
            setDescription(wallet.description);
            setBalance(wallet.balance);
        }
    }, [wallet]);

    function onSubmit(e) {
        e.preventDefault();

        const params = {
            name,
            description,
            balance,
        };

        onConfirm(params);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="FormGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridBalance">
                        <Form.Label>Balance</Form.Label>
                        <Form.Control type="nubmer" value={balance} onChange={(e) => setBalance(e.target.value)} />
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

export default EditWalletModal;

EditWalletModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    wallet: PropTypes.object.isRequired,
};
