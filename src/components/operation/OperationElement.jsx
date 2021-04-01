import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Badge } from 'react-bootstrap';

const OperationElement = ({ operation, selected }) => {
    return (
        <div className="operationPreview">
            <div>Date : {moment(operation.executedAt).format('l')}</div>
            <div>
                From :
                {operation.from._id === selected ? (
                    <Badge variant="primary">
                        {operation.from.name} - {operation.from.ownedBy.firstname} {operation.from.ownedBy.lastname}
                    </Badge>
                ) : (
                    ` ${operation.from.name} - ${operation.from.ownedBy.firstname} ${operation.from.ownedBy.lastname}`
                )}
            </div>
            <div>
                To :
                {operation.to._id === selected ? (
                    <Badge variant="primary">
                        {operation.to.name} - {operation.to.ownedBy.firstname} {operation.to.ownedBy.lastname}
                    </Badge>
                ) : (
                    ` ${operation.to.name} - ${operation.to.ownedBy.firstname} ${operation.to.ownedBy.lastname}`
                )}
            </div>
            <div>
                Amount :
                {operation.to._id === selected ? (
                    <Badge variant="success">{operation.amount}</Badge>
                ) : (
                    <Badge variant="danger">{operation.amount}</Badge>
                )}
                €
            </div>
            <div>
                <Badge variant="info">{operation.description}</Badge>
            </div>
        </div>
    );
};

export default OperationElement;

OperationElement.propTypes = {
    operation: PropTypes.object.isRequired,
    selected: PropTypes.string.isRequired,
};
