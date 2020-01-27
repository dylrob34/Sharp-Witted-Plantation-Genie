import React from "react";
import { updateLoginState } from '../GlobalStates';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };

        this.onUsername = this.onUsername.bind(this);
        this.onPassword = this.onPassword.bind(this);
        this.submit = this.submit.bind(this);
    }

    onUsername(e) {
        e.preventDefault();
        this.setState({ username: e.target.value });
    }

    onPassword(e) {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    submit(e) {
        e.preventDefault();

    }

    render() {
        return (
            <div>
            <h1>Login</h1>
            <form onSubmit={this.submit}>
                <label>username:
                <input type="text" value={this.state.username} onChange={this.onUsername} />
                </label>
                <label>password:
                <input type="password" value={this.state.password} onChange={this.onPassword} />
                </label>
                <input type="submit" value="submit" />
                </form>
            </div>
        );
    }
}