import React, { useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import operationService from '../../services/operationService';
import { Container, Row } from 'react-bootstrap';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';

const OperationsPageAdmin = () => {
    const [user] = useState(JSON.parse(localStorage.getItem('user')));
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        operationService
            .list()
            .then(
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
            )
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function nameFormatter(cell) {
        return `${cell.name}`;
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
                            <BootstrapTable data={operations} striped hover>
                                <TableHeaderColumn dataField="executedAt" dataFormat={dateFormatter} dataSort>
                                    Date
                                </TableHeaderColumn>
                                <TableHeaderColumn isKey dataField="from" dataFormat={nameFormatter}>
                                    From
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="to" dataFormat={nameFormatter}>
                                    To
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField="amount" dataFormat={amountFormatter} dataSort>
                                    Amount
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                )}
            </Row>
        </Container>
    );
};

export default OperationsPageAdmin;
