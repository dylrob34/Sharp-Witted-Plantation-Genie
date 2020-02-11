import React, { Component } from 'react';
import { getToken, subscribe, getLoginState, removeToken, unsubscribe } from "../GlobalStates";

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        var s = getLoginState();
        this.state = {
            user: {
                firstName: "",
                lastName: "",
            },
            isLoading: true,
            loggedIn: s,
        }
        this.toLogin = this.toLogin.bind(this);
        this.update = this.update.bind(this);
    }

    toLogin(e) {
        this.setState({ loggedIn: e });
        this.update();
    }

    componentWillUnmount() {
        unsubscribe(this.toLogin);
    }

    update() {

        const token = getToken();
        const btoken = token;

        fetch('user',
            {
                headers: {
                    Authorization: btoken,
                },
            })
            .then((response) => response.json())
            .then((user) => {
                this.setState({ user, isLoading: false, loggedIn: true });
            })
            .catch(error => {
                const logedIN = getLoginState();
                if (logedIN) {
                    removeToken();
                }
                this.setState({ loggedIn: false, isLoading: false });
            })
    }

    componentDidMount() {
        subscribe(this.toLogin);
        this.update();
            
    }

    render() {
        const content = this.state.isLoading ? <p>Loading</p> : this.state.loggedIn ?
            (
            <div>
                <p>first name: {this.state.user.firstName}</p>
                <p>last name: {this.state.user.lastName}</p>
            </div>
            ) : <p> you are not logged in</p >;
        return (
            <div>
                {content}
            </div>
        );
    }
}
