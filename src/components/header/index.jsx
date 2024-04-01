import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Logo } from '../';
import { Wrap } from './styles';
import { logout, isLogged } from '../../utils/JWTAuth';

const useDeviceDetect = () => {
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  React.useEffect(() => {
    if (!window.matchMedia) return;
    setIsTouchDevice(window.matchMedia('(pointer:coarse)').matches);
  }, []);

  return isTouchDevice;
};

const LinkAutoColapse = ({ to, onClick, children }) => {
  const isTouchDevice = useDeviceDetect();

  const click = () => {
    if (isTouchDevice) {
      const btn = document.getElementsByClassName('navbar-toggler');
      btn[0].click();
    }
  };

  return (
    <Link className={`nav-link`} onClick={onClick || click} to={to}>
      {children}
    </Link>
  );
};

const Header = () => {
  return (
    <Wrap>
      <Navbar expand='lg'>
        <Container>
          <Link className='nav-link' to={isLogged ? '/admin' : '/'}>
            <Logo />
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto' style={{ flex: 1, justifyContent: 'end' }}>
              {isLogged ? (
                <>
                  <LinkAutoColapse to='/admin/loja/productos'>
                    Loja - Productos
                  </LinkAutoColapse>
                  <LinkAutoColapse to='/admin/loja/vendas'>
                    Loja - Vendas
                  </LinkAutoColapse>
                  <LinkAutoColapse to='/admin/oficina/'>
                    Oficina
                  </LinkAutoColapse>
                  <LinkAutoColapse to='/admin/'>Viaturas</LinkAutoColapse>
                  <LinkAutoColapse to='/admin/users'>Usuários</LinkAutoColapse>
                  <LinkAutoColapse to='/admin/settings'>
                    Textos do site
                  </LinkAutoColapse>
                  <LinkAutoColapse onClick={logout}>Logout</LinkAutoColapse>
                </>
              ) : (
                <>
                  <LinkAutoColapse to='/loja/'>Loja</LinkAutoColapse>
                  <LinkAutoColapse to='/oficina/'>Oficina</LinkAutoColapse>
                  <LinkAutoColapse to='/login/'>Login</LinkAutoColapse>
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
