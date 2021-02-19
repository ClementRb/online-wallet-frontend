import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import MainPage from '../pages/main/MainPage';
import SettingsPage from '../pages/main/SettingsPage';
import { Navbar, Nav } from 'react-bootstrap';

const MainRouter = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Online Wallet</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#">
                        <NavLink to={'/'}>Main Page</NavLink>
                    </Nav.Link>
                    <Nav.Link href="#">
                        <NavLink to={'/settings'}>Settings</NavLink>
                    </Nav.Link>
                </Nav>
            </Navbar>
            <Switch>
                <Route exact path={'/'} component={MainPage} />
                <Route path={'/settings'} component={SettingsPage} />
            </Switch>
        </div>
    );
};

export default MainRouter;
