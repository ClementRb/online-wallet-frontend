import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AuthForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSubmitForm(e) {
        e.preventDefault();
        onSubmit({
            email,
            password,
        });
    }

    return (
        <div>
            <form onSubmit={onSubmitForm}>
                <input name="Login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input
                    name="Password"
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AuthForm;

AuthForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
