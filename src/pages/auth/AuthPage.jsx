import React, { useState } from 'react';
import AuthForm from '../../components/auth/AuthForm';
import PropTypes from 'prop-types';
import userService from '../../services/authService.js';
import RegisterForm from '../../components/register/RegisterForm';
import { toast, ToastContainer } from 'react-toastify';

const AuthPage = ({ setToken }) => {
    const [login, setLogin] = useState(true);

    function onSubmit({ email, password }) {
        userService.login(email, password).then(
            (response) => {
                toast.success('Success', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setToken(response.data);
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

    function registerSubmit({ firstname, lastname, email, password }) {
        userService.register(firstname, lastname, email, password).then(
            (response) => {
                toast.success('Success', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setToken(response.data);
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
    return (
        <div>
            <ToastContainer />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px' }}>
                <div style={{ margin: '20px', textAlign: 'center' }}>
                    <div>
                        <h2>{login ? 'Sign in to your account' : 'Register a new account'}</h2>
                    </div>
                </div>

                {login ? <AuthForm onSubmit={onSubmit} /> : <RegisterForm onSubmit={registerSubmit} />}

                <div style={{ margin: '20px', textAlign: 'center' }}>
                    <div>or</div>
                    <div>
                        <a
                            href="#"
                            onClick={() => {
                                setLogin(!login);
                            }}>
                            {login ? 'register a new account' : 'sign in to your account'}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

AuthPage.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default AuthPage;
