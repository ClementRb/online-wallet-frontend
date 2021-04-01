import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:5000/api/';

class WalletService {
    createWallet(params) {
        return axios.post(API_URL + 'wallets', { params }, { headers: authHeader() }).then((response) => {
            return response;
        });
    }

    getOperations(id) {
        return axios.get(API_URL + 'wallets/' + id + '/operations', { headers: authHeader() }).then((response) => {
            return response;
        });
    }

    list() {
        return axios.get(API_URL + 'wallets', { headers: authHeader() }).then((response) => {
            return response;
        });
    }

    editWallet(walletId, params) {
        return axios.put(API_URL + 'wallets/' + walletId, { params }, { headers: authHeader() }).then((response) => {
            return response;
        });
    }
}

const walletService = new WalletService();
export default walletService;
