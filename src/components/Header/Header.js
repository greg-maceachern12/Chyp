
import React, { Component } from 'react';
import logo from './logoftb.png';
import {Link} from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import './Header.css';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand><Link to='/'><img id = "logo" src = {logo} width = 'auto' height="60" alt = 'logo'/></Link>  </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/' className="navlink">Home</Link>
              </NavItem>
              <NavItem>
                <Link to='/events' className="navlink">Events</Link>
              </NavItem>
              <NavItem>
                <Link to='/create' className="navlink">Create</Link>
              </NavItem>
              <NavItem>
                <Link to='/about' className="navlink">About</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
