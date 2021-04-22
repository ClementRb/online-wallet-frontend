import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainRouter, AuthRouter } from './routes';
import React from 'react';
import Login from './pages/auth/AuthPage';
import useToken from './services/useToken';
import { ToastContainer } from 'react-toastify';

function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <div className="App">
            <ToastContainer />
            <BrowserRouter>
                <Switch>
                    <Route path="/auth" component={AuthRouter} />
                    <Route path="/" component={MainRouter} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
