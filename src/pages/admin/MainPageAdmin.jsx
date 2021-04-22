import React, { useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Container, Row } from 'react-bootstrap';
import moment from 'moment';
import walletService from '../../services/walletService';
import { toast, ToastContainer } from 'react-toastify';

const MainPageAdmin = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        walletService
            .list()
            .then(
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
            )
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function nameFormatter(cell) {
        if (cell) {
            return `${cell.lastname} ${cell.firstname}`;
        } else return `User deleted`;
    }

    function dateFormatter(cell) {
        return `${moment(cell).format('llll')}`;
    }

    function amountFormatter(cell) {
        return `${cell} €`;
    }

    return (
        <Container>
            <ToastContainer />
            <Row>
                {!loading && (
                    <div>
                        <h1>Hello {user.user.firstname}</h1>
                        <div style={{ margin: '20px' }}>
                            <BootstrapTable data={wallets} striped hover>
                                <TableHeaderColumn dataField="createdAt" dataFormat={dateFormatter} dataSort>
                                    Creation date
                                </TableHeaderColumn>
                                <TableHeaderColumn isKey dataField="name">
                                    Name
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="description">Description</TableHeaderColumn>
                                <TableHeaderColumn dataField="ownedBy" dataFormat={nameFormatter}>
                                    Owner
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="balance" dataFormat={amountFormatter} dataSort>
                                    Balance
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                )}
            </Row>
        </Container>
    );
};

export default MainPageAdmin;
