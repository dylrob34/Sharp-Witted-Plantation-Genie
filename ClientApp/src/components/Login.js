import React from "react";
import { updateLoginState, updateToken } from '../GlobalStates';

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
        fetch('auth/login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password
                })
            })
            .then((response) => response.json())
            .then((resjson) => {
               /* if (!response.failed) {
                    updateLoginState(response.login)
                }*/
                console.log("response is: " + resjson.token);
                updateLoginState(true);
                updateToken(resjson.token);
            });
    }

    render() {
        return (
            <div>
            <h1>Login</h1>
            <form>
                <label>username:
                <input type="text" value={this.state.username} onChange={this.onUsername} />
                </label>
                <label>password:
                <input type="password" value={this.state.password} onChange={this.onPassword} />
                </label>
                    <input type="button" value="submit" onClick={this.submit}/>
                </form>
            </div>
        );
    }
}