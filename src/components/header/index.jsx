import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Logo } from '../';
import { Wrap } from './styles';
import { logout, isLogged } from '../../utils/JWTAuth';

const useDeviceDetect = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (!window.matchMedia) return;
    setIsTouchDevice(window.matchMedia('(pointer:coarse)').matches);
  }, []);

  return isTouchDevice;
};

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const LinkAutoColapse = ({ to, onClick, children }) => {
    const isTouchDevice = useDeviceDetect();

    const click = () => {
      if (isTouchDevice) {
        const btn = document.getElementsByClassName('navbar-toggler');
        btn[0].click();
      }

      setExpanded(false);
    };

    return (
      <Link className={`nav-link`} onClick={onClick || click} to={to}>
        {children}
      </Link>
    );
  };

  return (
    <Wrap>
      <Navbar
        expand='lg'
        variant='dark'
        onToggle={(x) => setExpanded(x)}
        expanded={expanded}
      >
        <Container>
          <Link className='nav-link' to={isLogged ? '/admin' : '/'}>
            <Logo />
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto' style={{ flex: 1, justifyContent: 'end' }}>
              {isLogged ? (
                <>
                  <LinkAutoColapse to='/admin/'>Viaturas</LinkAutoColapse>
                  <LinkAutoColapse to='/admin/users'>Usuários</LinkAutoColapse>
                  <NavDropdown title='Loja' id='basic-nav-dropdown'>
                    <LinkAutoColapse to='/admin/loja-produtos'>
                      Loja - Produtos
                    </LinkAutoColapse>
                    <LinkAutoColapse to='/admin/loja-vendas'>
                      Loja - Vendas
                    </LinkAutoColapse>
                  </NavDropdown>
                  <NavDropdown title='Settings' id='basic-nav-dropdown'>
                    <LinkAutoColapse to='/admin/oficina/'>
                      Settings - Oficina
                    </LinkAutoColapse>
                    <LinkAutoColapse to='/admin/footer'>
                      Settings - Footer
                    </LinkAutoColapse>
                  </NavDropdown>
                  <LinkAutoColapse onClick={logout}>Logout</LinkAutoColapse>
                </>
              ) : (
                <>
                  <LinkAutoColapse to='/'>
                    <FontAwesomeIcon icon='fa fa-car' className='icon' />{' '}
                    Viaturas
                  </LinkAutoColapse>
                  <LinkAutoColapse to='/loja/'>
                    <FontAwesomeIcon
                      icon='fa fa-shopping-bag'
                      className='icon'
                    />{' '}
                    Loja
                  </LinkAutoColapse>
                  <LinkAutoColapse to='/oficina/'>
                    <FontAwesomeIcon icon='fa fa-cog' className='icon' />{' '}
                    Oficina
                  </LinkAutoColapse>
                  <LinkAutoColapse to='/login/'>
                    <FontAwesomeIcon icon='fa fa-sign-in' className='icon' />{' '}
                    Login
                  </LinkAutoColapse>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Wrap>
  );
};

export default Header;
