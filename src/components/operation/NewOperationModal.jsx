import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

const NewOperationModal = ({ show, onClose, wallets, onConfirm }) => {
    const [from, setFrom] = useState('null');
    const [to, setTo] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);

    function createNewOperation() {
        console.log(from, to, description, amount);
        if (from !== 'null' && to && description && amount) {
            const newOperation = {
                from,
                to,
                description,
                amount,
                executedAt: moment().format(),
            };

            onConfirm(newOperation);
        }
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Make a new operation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Row} controlId="formHorizontalFrom">
                            <Form.Control as="select" value={from} onChange={(e) => setFrom(e.target.value)}>
                                <option value="null">Select wallet</option>
                                {wallets.map((wallet) => {
                                    return (
                                        <option key={wallet.value} value={wallet.value}>
                                            {wallet.name}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalTo">
                            <Form.Label column sm={2}>
                                To
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    placeholder="To"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalDescriptions">
                            <Form.Label column sm={2}>
                                Description
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    as="textarea"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalName">
                            <Form.Label column sm={2}>
                                Amount
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={createNewOperation}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NewOperationModal;

NewOperationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    wallets: PropTypes.array.isRequired,
    onConfirm: PropTypes.func.isRequired,
};
