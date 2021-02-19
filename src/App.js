import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainRouter, AuthRouter } from './routes';
import React from 'react';

function App() {
    return (
        <div className="App">
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
