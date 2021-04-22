import axios from 'axios';
import authHeader from './auth-header.js';

const API_URL = 'http://localhost:5000/api/';

class UserService {
    getUser(userId) {
        return axios.get(API_URL + 'users/' + userId, { headers: authHeader() }).then((response) => {
            return response;
        });
    }

    getUsers() {
        return axios.get(API_URL + 'users', { headers: authHeader() }).then((response) => {
            return response;
        });
    }

    getWalletsUser(userId) {
        return axios.get(API_URL + 'users/' + userId + '/wallets', { headers: authHeader() }).then((response) => {
            return response;
        });
    }

    editUser(userId, params) {
        return axios.put(API_URL + 'users/' + userId, { params }, { headers: authHeader() }).then((response) => {
            return response;
        });
    }

    deleteUser(userId) {
        return axios.delete(API_URL + 'users/' + userId, { headers: authHeader() }).then((response) => {
            return response;
        });
    }
}

const userService = new UserService();

export default userService;
