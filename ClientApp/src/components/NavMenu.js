import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Popover, PopoverBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Login from "./LoginSignUpPopover.js";
import './NavMenu.css';
import { removeToken, getToken, subscribe } from "../GlobalStates.js";

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            popoveropen: false,
            loggedIn: false,
        };
        const t = getToken();
        if (t.length > 0) {
            fetch("auth/verify", {
                headers: {
                    Authorization: "Bearer " + t,
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({ loggedIn: true });
                    }
                })
        }
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
        this.onLoginStatusChange = this.onLoginStatusChange.bind(this);

        subscribe(this.onLoginStatusChange);
    }

    toggle() {
        this.setState({ popoveropen: !this.state.popoveropen });
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    logout() {
        removeToken();
    }

    onLoginStatusChange(e) {
        this.setState({ loggedIn: e });
    }

    render() {
        const loggedIn = this.state.loggedIn;
        var toShow;

        if (loggedIn == false) {
            toShow = (
                <NavItem>
                    <NavLink style={{'cursor': 'pointer'}} id="Popoverlogin" className="text-dark">Login/SignUp</NavLink>
                    <Popover placement="bottom" isOpen={this.state.popoveropen} target="Popoverlogin" toggle={this.toggle} trigger="legacy">
                        <PopoverBody>
                            <Login toggle={this.toggle} />
                        </PopoverBody>
                    </Popover>
                </NavItem>
            )
        } else {
            toShow = (
                <>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/" onClick={this.logout} >Logout</NavLink>
                    </NavItem>
                </>
            )
        }

        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">PlantationGenie</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/buy">Buy</NavLink>
                                </NavItem>
                                {toShow}

                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
