"use strict"
import React, { Component } from 'react'
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Menu extends Component {
  render () {
    const { cartItemsNumber, isAuthenticated } = this.props

    return (
      <Navbar inverse fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>        
            <LinkContainer to='/about'>
              <NavItem eventKey={1} >About</NavItem>
            </LinkContainer>
            <LinkContainer to='/contacts'>
              <NavItem eventKey={2} >Contact Us</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to='/admin'>
              <NavItem eventKey={3}>Admin</NavItem>
            </LinkContainer>
            <LinkContainer to='/cart'>
              <NavItem eventKey={4}>
                Your cart
                &nbsp;
                {cartItemsNumber && <Badge className='badge'>{cartItemsNumber}</Badge>}
              </NavItem>
            </LinkContainer>
            {!isAuthenticated
              ? <LinkContainer to='/auth'>
                  <NavItem eventKey={5} >Authenticate</NavItem>
                </LinkContainer>
              : <LinkContainer to='/signout'>
                  <NavItem eventKey={6}>Signout</NavItem>
                </LinkContainer>}            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Menu