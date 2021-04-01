import React, { useEffect, useState } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import userService from '../../services/userService.js';
import ConfirmModal from '../../components/modals/ConfirmModal.jsx';
import { toast, ToastContainer } from 'react-toastify';
import EditUserModal from '../../components/modals/EditUserModal.jsx';

const UsersPageAdmin = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [userSelected, setUserSelected] = useState(null);

    useEffect(() => {
        setLoading(true);
        userService
            .getUsers()
            .then(
                (response) => {
                    setUsers(response.data);
                },
                (err) => {
                    toast.error(err.response.data.message, {
                        position: 'top-right',
                        autoClose: 3000,
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

    const handleCloseConfirmModal = () => {
        setShowConfirModal(false);
    };

    const handleCloseEditUserModalModal = () => {
        setShowEditUserModal(false);
    };

    function handleConfirmModal() {
        setShowConfirModal(false);
        userService.deleteUser(userSelected._id).then(
            () => {
                toast.success('User deleted', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(true);
                userService
                    .getUsers()
                    .then(
                        (response) => {
                            setUsers(response.data);
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

    function handleConfirmEditUserModal(params) {
        setShowEditUserModal(false);
        userService.editUser(userSelected._id, params).then(
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
                userService
                    .getUsers()
                    .then(
                        (response) => {
                            setUsers(response.data);
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

    function actionFormatter(cell, row) {
        return (
            <div>
                {cell === 'guest' ? (
                    <div>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setShowEditUserModal(true);
                                setUserSelected(row);
                            }}>
                            Edit
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => {
                                setShowConfirModal(true);
                                setUserSelected(row);
                            }}>
                            Delete
                        </Button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        );
    }

    return (
        <div>
            <Container>
                <ToastContainer />
                <Row>
                    {!loading && (
                        <div>
                            <h1>Hello {user.user.firstname}</h1>
                            <div style={{ margin: '20px' }}>
                                <BootstrapTable data={users} striped hover>
                                    <TableHeaderColumn isKey dataField="email">
                                        Email
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField="firstname">Firstname</TableHeaderColumn>
                                    <TableHeaderColumn dataField="lastname">Lastname</TableHeaderColumn>
                                    <TableHeaderColumn dataField="role">Role</TableHeaderColumn>
                                    <TableHeaderColumn dataField="role" dataFormat={actionFormatter}>
                                        Actions
                                    </TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                            <ConfirmModal
                                show={showConfirmModal}
                                onClose={handleCloseConfirmModal}
                                onConfirm={handleConfirmModal}
                            />

                            <EditUserModal
                                show={showEditUserModal}
                                onClose={handleCloseEditUserModalModal}
                                onConfirm={(params) => handleConfirmEditUserModal(params)}
                                user={userSelected}
                            />
                        </div>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default UsersPageAdmin;
