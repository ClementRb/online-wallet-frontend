import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthPage from '../pages/auth/AuthPage';
import { ToastContainer } from 'react-toastify';

const AuthRouter = () => {
    return (
        <div>
            <ToastContainer />
            <Switch>
                <Route path={'/auth'} component={AuthPage} />
            </Switch>
        </div>
    );
};

export default AuthRouter;
