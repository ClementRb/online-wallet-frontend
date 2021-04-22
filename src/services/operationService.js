import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:5000/api/';

class OperationService {
    list() {
        return axios.get(API_URL + 'operations', { headers: authHeader() }).then((response) => {
            return response;
        });
    }
    create(params) {
        return axios.post(API_URL + 'operations', { params }, { headers: authHeader() }).then((response) => {
            return response;
        });
    }
}

const operationService = new OperationService();
export default operationService;
