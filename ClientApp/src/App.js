import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Buy } from './components/Buy';
import LoginPopover from './components/LoginSignUpPopover';
import Dashboard from './components/Dashboard';
import { Redirect } from "react-router-dom";
import { subscribe, getToken, updateLoginState } from "./GlobalStates.js";

import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,

        }
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        subscribe(this.update);
        const token = getToken();
        fetch("/auth/verify", {
            headers: {
                authorization: token
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    updateLoginState(true);
                }
            })
    }

    update(e) {
        this.setState({ loggedIn: e });
    }

    render() {
        var content;
        if (this.state.loggedIn) {
            content = <Dashboard />
        } else {
            content = <Redirect to={{
                pathname: "login",
                state: { forward: "/dashboard" }
            }} />
        }
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/buy' component={Buy} />
                <Route path='/dashboard' render={() => content}/>
                <Route path='/login' component={LoginPopover} />
            </Layout>
        );
    }
}
