import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import MainPage from '../pages/main/MainPage';
import SettingsPage from '../pages/main/SettingsPage';
import OperationPage from '../pages/main/OperationsPage';
import userService from '../services/userService';
import MainPageAdmin from '../pages/admin/MainPageAdmin';
import OperationsPageAdmin from '../pages/admin/OperationsPageAdmin';
import UsersPageAdmin from '../pages/admin/UsersPageAdmin';
import { ToastContainer, toast } from 'react-toastify';

const MainRouter = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        userService
            .getUser(user._id)
            .then(
                (response) => {
                    setUser({ ...user, user: response.data });
                    localStorage.setItem('user', JSON.stringify({ ...user, user: response.data }));
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
            )
            .finally(() => {
                setLoading(false);
            });
    }, []);

    function logout() {
        localStorage.clear('user');
        return <Redirect to="/auth" />;
    }
    return (
        <div>
            <ToastContainer />
            {!loading && (
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand>Online wallet</Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/operations">
                                    Operations
                                </Nav.Link>
                                {user.user.role === 'admin' && (
                                    <Nav.Link as={Link} to="/users">
                                        Users
                                    </Nav.Link>
                                )}
                                <Nav.Link as={Link} to="/settings">
                                    Settings
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Button onClick={logout} variant="primary">
                                    Logout
                                </Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                    {user.user.role === 'guest' && (
                        <Switch>
                            <Route exact path={'/'} component={MainPage} />
                            <Route path={'/operations'} component={OperationPage} />
                            <Route path={'/settings'} component={SettingsPage} />
                        </Switch>
                    )}
                    {user.user.role === 'admin' && (
                        <Switch>
                            <Route exact path={'/'} component={MainPageAdmin} />
                            <Route path={'/operations'} component={OperationsPageAdmin} />
                            <Route path={'/users'} component={UsersPageAdmin} />
                            <Route path={'/settings'} component={SettingsPage} />
                        </Switch>
                    )}
                </div>
            )}
        </div>
    );
};

export default MainRouter;
