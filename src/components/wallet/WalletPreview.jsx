import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';
import EditWalletModal from '../modals/EditWalletModal';
import walletService from '../../services/walletService';
import { toast, ToastContainer } from 'react-toastify';

const WalletPreview = ({ wallet, walletSelected, onSelection }) => {
    const [showEditWalletModal, setShowEditWalletModal] = useState(false);
    function selectWallet(walletId) {
        onSelection(walletId);
    }

    const handleCloseEditWalletModal = () => setShowEditWalletModal(false);

    const handleShowEditWalletModal = () => setShowEditWalletModal(true);

    function handleConfirmEditWalletModal(params) {
        setShowEditWalletModal(false);
        console.log(params);
        walletService.editWallet(wallet._id, params).then(
            () => {
                toast.success('Wallet modified', {
                    position: 'top-right',
                    autoClose: 3000,
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
        <div>
            <ToastContainer />
            <Card border="dark" style={{ width: '15rem', margin: '20px' }}>
                <Card.Body>
                    <Card.Title>
                        {wallet.name} : {wallet.balance} €
                    </Card.Title>
                    <Card.Text>{wallet.description}</Card.Text>
                    {walletSelected === wallet._id ? (
                        <div>
                            <Button disabled variant="primary">
                                Selected
                            </Button>
                            <Button onClick={handleShowEditWalletModal} variant="secondary">
                                <Sliders />
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={() => selectWallet(wallet._id)} variant="primary">
                            Select
                        </Button>
                    )}
                </Card.Body>
                <EditWalletModal
                    show={showEditWalletModal}
                    onClose={handleCloseEditWalletModal}
                    onConfirm={handleConfirmEditWalletModal}
                    wallet={wallet}
                />
            </Card>
        </div>
    );
};

export default WalletPreview;

WalletPreview.propTypes = {
    wallet: PropTypes.object.isRequired,
    walletSelected: PropTypes.string.isRequired,
    onSelection: PropTypes.func.isRequired,
};
