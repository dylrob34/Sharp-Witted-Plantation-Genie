﻿import React from "react";
import { TabContent, TabPane, Nav, NavLink, NavItem, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import classnames from 'classnames';
import { updateLoginState, updateToken } from '../GlobalStates';
import { Redirect } from "react-router-dom";
import isValidEmailAddress from '../utils/validateEmail';

export default class LoginPopover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm: "",
			email: "",
            signInErrorMesssage: "",
            usernameErrorMessage: "",
            passwordErrorMessage: "",
            confirmedPasswordErrorMessage: "",
            emailErrorMessage: "",
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
        const registerFormIsValid = this.validateRegisterForm();
        if (!registerFormIsValid){
            return;
        }
        fetch('user/register',
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
            .then((responseJson) => {
                if (responseJson === true){
                    // the user was created successfully, so, sign him in 
                    this.login();
                    return;
                }
                else {
                    this.handleRegistrationErrors(responseJson.errors);
                }
            });
    }

    validateRegisterForm = () => {
        let usernameErrorMessage, passwordErrorMessage, confirmedPasswordErrorMessage, emailErrorMessage;
        usernameErrorMessage = passwordErrorMessage = confirmedPasswordErrorMessage = emailErrorMessage = "";

        if (this.state.username.trim() === "") usernameErrorMessage = "The username field is required";
        if (this.state.password.trim() === "") passwordErrorMessage = "The password field is required";
        if (this.state.confirm !== this.state.password) confirmedPasswordErrorMessage = "The passwords do not match"

        if (this.state.email.trim() === "") emailErrorMessage = "The email field is required";
        else if (!isValidEmailAddress(this.state.email.trim())) emailErrorMessage = "Invalid email format";
        this.setState({
            usernameErrorMessage,
            passwordErrorMessage,
            confirmedPasswordErrorMessage,
            emailErrorMessage
        })
        console.log(usernameErrorMessage, passwordErrorMessage, confirmedPasswordErrorMessage, emailErrorMessage);
        
        if (usernameErrorMessage || passwordErrorMessage || confirmedPasswordErrorMessage || emailErrorMessage) return false;
        return true;
    }

    handleRegistrationErrors = (registrationErrors) => {
        const emailErrorMessage = registrationErrors.Email ? registrationErrors.Email[0] : "";
        const usernameErrorMessage = registrationErrors.Username ? registrationErrors.Username[0] : "";
        this.setState({emailErrorMessage, usernameErrorMessage});
    }

    changeTab(tab) {
        // clear username and password when tab changes
        this.setState({ 
            activeTab: tab,
            username: "",
            password: ""
        });
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
        const { usernameErrorMessage, passwordErrorMessage, confirmedPasswordErrorMessage, emailErrorMessage } = this.state;
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
                            <Input invalid = {usernameErrorMessage !== ""} type="text" name="susername" id="susername" placeholder="enter username..." onChange={this.onUsername} />
                            <FormFeedback>{usernameErrorMessage}</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="spassword">Password</Label>
                            <Input invalid = {passwordErrorMessage !== ""} type="password" name="spassword" id="spassword" placeholder="enter password..." onChange={this.onPassword} />
                            <FormFeedback>{passwordErrorMessage}</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="confirm">Confirm Password</Label>
                            <Input invalid = {confirmedPasswordErrorMessage !== ""}  type="password" name="confim" id="confirm" placeholder="confirm password..." onKeyDown={this.onKeyDownCreate} onChange={this.onConfirm} />
                            <FormFeedback>{confirmedPasswordErrorMessage}</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="email">Email</Label>
                            <Input invalid = {emailErrorMessage !== ""} type="text" name="email" id="email" placeholder="enter email..." onChange={this.onEmail} />
                            <FormFeedback>{emailErrorMessage}</FormFeedback>
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