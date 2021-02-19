import React from 'react';
import AuthForm from '../../components/auth/AuthForm';

const AuthPage = () => {
    function onLogin({ email, password }) {
        console.log(email, password);
    }
    return (
        <div>
            <AuthForm onSubmit={onLogin} />
        </div>
    );
};

export default AuthPage;
