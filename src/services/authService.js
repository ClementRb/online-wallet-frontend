import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

class AuthService {
    login(email, password) {
        return axios.post(API_URL + 'login', { email, password }).then((response) => {
            if (response.data.jwt) {
                return response;
            }
        });
    }

    register(firstname, lastname, email, password) {
        return axios
            .post(API_URL + 'register', {
                firstname,
                lastname,
                email,
                password,
            })
            .then((response) => {
                return response;
            });
    }
}

const authService = new AuthService();

export default authService;
