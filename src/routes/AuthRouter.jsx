import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthPage from '../pages/auth/AuthPage';

const AuthRouter = () => {
    console.log('auth router');

    return (
        <div>
            <Switch>
                <Route path={'/auth'} component={AuthPage} />
            </Switch>
        </div>
    );
};

export default AuthRouter;
