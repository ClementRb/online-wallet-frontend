import React, { useState, useEffect } from 'react';
import userService from '../../services/userService.js';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CreateWalletModal from '../../components/wallet/CreateWalletModal.jsx';
import WalletPreview from '../../components/wallet/WalletPreview.jsx';
import { toast, ToastContainer } from 'react-toastify';
import walletService from '../../services/walletService';
import OperationElement from '../../components/operation/OperationElement.jsx';

const MainPage = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(true);
    const [showCreateModalWallet, setShowCreateModalWallet] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [walletSelected, setWalletSelected] = useState(null);
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        setLoading(true);
        userService
            .getWalletsUser(user._id)
            .then(
                (response) => {
                    setWallets(response.data);
                    if (response.data.length > 0) {
                        setWalletSelected(response.data[0]._id);
                        getWalletOperations(response.data[0]._id);
                    }
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

    function getWalletOperations(walletId) {
        walletService.getOperations(walletId).then(
            (response) => {
                setOperations(response.data);
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

    const handleCloseCreateModalWallet = () => {
        setShowCreateModalWallet(false);
        userService.getWalletsUser(user._id).then(
            (response) => {
                setWallets(response.data);
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
    };
    const handleShowCreateModalWallet = () => setShowCreateModalWallet(true);

    function handleCreateNewWallet(newWallet) {
        walletService.createWallet(newWallet).then(
            () => {
                toast.success('Wallet created', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setShowCreateModalWallet(false);
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
    function onSelectionHandler(walletId) {
        setWalletSelected(walletId);
        getWalletOperations(walletId);
    }

    return (
        <Container>
            <ToastContainer />
            <Row>
                <Col>
                    <div style={{ margin: '20px' }}>
                        <Button onClick={handleShowCreateModalWallet} variant="primary">
                            Create wallet
                        </Button>
                    </div>
                    {wallets &&
                        wallets.map((wallet) => {
                            return (
                                <WalletPreview
                                    key={wallet._id}
                                    wallet={wallet}
                                    walletSelected={walletSelected}
                                    onSelection={(walletId) => onSelectionHandler(walletId)}
                                />
                            );
                        })}
                </Col>
                <Col xs={6}>
                    {!loading && (
                        <div style={{ margin: '20px' }}>
                            {user && (
                                <div>
                                    <h1>Operations</h1>
                                </div>
                            )}
                            {!loading &&
                                operations.map((operation) => {
                                    return (
                                        <OperationElement
                                            key={operation._id}
                                            operation={operation}
                                            selected={walletSelected}
                                        />
                                    );
                                })}
                        </div>
                    )}
                    <CreateWalletModal
                        show={showCreateModalWallet}
                        onClose={handleCloseCreateModalWallet}
                        onSubmit={(wallet) => handleCreateNewWallet(wallet)}
                    />
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default MainPage;
