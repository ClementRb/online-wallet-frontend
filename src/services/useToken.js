import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('user');
        const userToken = JSON.parse(tokenString);
        if (userToken) {
            return userToken.jwt;
        } else return null;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('user', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token,
    };
}
