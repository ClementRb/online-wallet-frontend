import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import userService from '../../services/userService.js';
import NewOperationModal from '../../components/operation/NewOperationModal.jsx';
import walletService from '../../services/walletService';
import { toast, ToastContainer } from 'react-toastify';
import operationService from '../../services/operationService';

const OperationPage = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [operations, setOperations] = useState([]);
    const [showNewOperationModal, setShowNewOperationModal] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [listWallets, setListWallets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userService
            .getWalletsUser(user._id)
            .then(
                (response) => {
                    setWallets(response.data);
                    const walletList = response.data.map(({ _id, name }) => ({
                        value: _id,
                        name: name,
                    }));
                    setListWallets(walletList);
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
            )
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        wallets.forEach((wallet) => {
            const id = wallet._id;
            walletService.getOperations(id).then(
                (response) => {
                    setOperations(operations.concat(response.data));
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
        });
    }, [wallets]);

    function createNewOperation(params) {
        operationService.create(params).then(
            () => {
                toast.success('Success', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setShowNewOperationModal(false);
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

    const handleCloseCreateNewOperationModal = () => {
        setShowNewOperationModal(false);
    };
    const handleShowCreateOperationModal = () => setShowNewOperationModal(true);

    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col>
                    <Button onClick={handleShowCreateOperationModal} variant="primary">
                        New operation
                    </Button>
                </Col>
                <Col xs={6}>
                    {!loading &&
                        wallets &&
                        wallets.map((wallet) => {
                            return (
                                <Card key={wallet._id} border="dark" style={{ width: '20rem', margin: '20px' }}>
                                    <Card.Body>
                                        <Card.Title>
                                            {wallet.name} : {wallet.balance} €
                                        </Card.Title>
                                        <Card.Text>
                                            {wallet.description} <br />
                                            {wallet._id}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    <NewOperationModal
                        wallets={listWallets}
                        show={showNewOperationModal}
                        onClose={handleCloseCreateNewOperationModal}
                        onConfirm={(params) => createNewOperation(params)}
                    />
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default OperationPage;
