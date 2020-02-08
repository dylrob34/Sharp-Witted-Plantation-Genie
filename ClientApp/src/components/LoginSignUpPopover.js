import React from "react";
import { TabContent, TabPane, Nav, NavLink, NavItem, FormGroup, Label, Input, Button, Form } from "reactstrap";
import classnames from 'classnames';
import { updateLoginState, updateToken } from '../GlobalStates';
import { Redirect } from "react-router-dom";

export default class LoginPopover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm: "",
			email: "",
			signInErrorMesssage: "",
            activeTab: '1',
			redirect: false,
        };

        this.onUsername = this.onUsername.bind(this);
        this.onPassword = this.onPassword.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onEmail = this.onEmail.bind(this);
        this.login = this.login.bind(this);
        this.create = this.create.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.onKeyDownCreate = this.onKeyDownCreate.bind(this);
        this.onKeyDownLogin = this.onKeyDownLogin.bind(this);
    }

    onUsername(e) {
        e.preventDefault();
        this.setState({ username: e.target.value });
    }

    onPassword(e) {
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    onConfirm(e) {
        this.setState({ confirm: e.target.value });
    }

    onEmail(e) {
        this.setState({ email: e.target.value });
    }

    login() {
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
                if (resjson.failed){
					this.setState({signInErrorMessage : "Invalid username or password"});
					return;
				}
                updateToken(resjson.token);
				updateLoginState(true);
                if (this.props.location != undefined) {
                    this.setState({ redirect: true });
                } else {
                    this.props.toggle();
                }
            });
    }

    create() {
        fetch('auth/create',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': this.state.username,
                    'password': this.state.password,
                    'confirm': this.state.confirm,
                    'email': this.state.email
                })
            })
            .then((response) => response.json())
            .then((resjson) => {
                console.log(resjson);
            });
    }

    changeTab(tab) {
        this.setState({ activeTab: tab });
    }

    onKeyDownLogin = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
        if (event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.login();
        }
    }

	onKeyDownCreate = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		// 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
		if(event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			this.create();
		}
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={this.props.location.state.forward} />);
        }
        return (
            <div>
                <Nav tabs style={{'marginBottom': '.9rem'}}>
                    <NavItem>
                        <NavLink style={{'cursor': 'pointer'}} 
                        className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.changeTab('1') }}>
                            Login
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{'cursor': 'pointer'}} 
                        className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.changeTab('2') }}>
                            Sign Up
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" placeholder="enter username..." onChange={this.onUsername} />
						</FormGroup>
						<FormGroup>
						<Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="enter password..." onKeyDown={this.onKeyDownLogin} onChange={this.onPassword} />
						</FormGroup>
						{this.state.signInErrorMessage && <span className="text-danger">Invalid username or password</span> }
                        <div style={{ "textAlign": "center", "margin": "1.6rem 0 1rem 0" }}>
                            <Button color="primary" onClick={this.login} >Login</Button>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <FormGroup>
                            <Label for="susername">Username</Label>
                            <Input type="text" name="susername" id="susername" placeholder="enter username..." onChange={this.onUsername} />
						</FormGroup>
						<FormGroup>
							<Label for="spassword">Password</Label>
                            <Input type="password" name="spassword" id="spassword" placeholder="enter password..." onChange={this.onPassword} />
						</FormGroup>
						<FormGroup>
							<Label for="confirm">Confirm Password</Label>
                            <Input type="password" name="confim" id="confirm" placeholder="confirm password..." onKeyDown={this.onKeyDownCreate} onChange={this.onConfirm} />
						</FormGroup>
						<FormGroup>
							<Label for="email">Email</Label>
                            <Input type="text" name="email" id="email" placeholder="enter email..." onChange={this.onEmail} />
						</FormGroup>
                        <div style={{ "textAlign": "center", "margin": "1.6rem 0 1rem 0" }}>
                            <Button color="primary" onClick={this.create} >Create Account</Button>
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}