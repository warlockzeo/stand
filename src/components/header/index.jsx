import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Logo } from '../';
import { Wrap } from './styles';
import { logout, isLogged } from '../../utils/JWTAuth';

const Header = () => {
  return (
    <Wrap>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Link className='nav-link' to={isLogged ? '/admin' : '/'}>
            <Logo />
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto' style={{ flex: 1, justifyContent: 'end' }}>
              {isLogged ? (
                <>
                  <Link className='nav-link' to='/admin/'>
                    Viaturas
                  </Link>
                  <Link className='nav-link' to='/admin/users'>
                    Users
                  </Link>
                  <Link className='nav-link' to='/admin/settings'>
                    Settings
                  </Link>
                  <Link className='nav-link' onClick={logout}>
                    Logout
                  </Link>
                </>
              ) : (
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Wrap>
  );
};

export default Header;
