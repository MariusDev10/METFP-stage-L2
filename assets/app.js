import React from 'react';
import './styles/app.css';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
// start the Stimulus application
import './bootstrap';
import Navbar from './js/components/Navbar';
import Home from './js/components/Home';
import Login from './js/pages/Login';

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <main className="container-fluid pt-1">
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={Home} />
                </Switch>
            </main>

        </HashRouter>
    );


};


const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);