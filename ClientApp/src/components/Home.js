import React, { Component } from 'react';
import { getToken } from "../GlobalStates";

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
            },
            isLoading: true,
        }
    }

    componentDidMount() {
        const token = getToken();
        const btoken = "Bearer " + token;
        console.log(token);
        //if (token !== "") {
            fetch('user',
                {
                    headers: {
                        Authorization: btoken,
                    },
                })
                .then((response) => response.json())
                .then((user) => {
                    this.setState({ user, isLoading: false });
                })
                .catch(error => {
                    console.log(error);
                })
        //}
            
    }

    render() {
        const content = this.state.isLoading ? <p>Loading</p> : (
            <div>
                <p>first name: {this.state.user.firstName}</p>
                <p>last name: {this.state.user.lastName}</p>
            </div>
        );
        return (
            <div>
                {content}
            </div>
        );
    }
}
