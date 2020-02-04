import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Popover, PopoverBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Login from "./LoginSignUpPopover.js";
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            popoveropen: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ popoveropen: !this.state.popoveropen });
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
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
                                <NavItem>
                                    <NavLink id="Popoverlogin" className="text-dark">Login/SignUp</NavLink>
                                    <Popover placement="bottom" isOpen={this.state.popoveropen} target="Popoverlogin" toggle={this.toggle}>
                                        <PopoverBody>
                                            <Login />
                                        </PopoverBody>
                                    </Popover>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/dashboard">Dashboard</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
