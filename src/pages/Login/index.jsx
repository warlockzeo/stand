import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Col, Row, Button, Alert } from 'react-bootstrap';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import Styled from 'styled-components';

import { Logo } from '../../components';
import { login as submitLogin, isLogged } from '../../utils/JWTAuth.js';
import { Loader } from '../../components/index.jsx';

const Wrap = Styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const schema = Yup.object().shape({
  login: Yup.string().required('Precisa informar um login'),
  senha: Yup.string().required('Precisa informar uma Senha'),
});

const Login = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ login, senha }) => {
    setIsLoading(true);
    await submitLogin({ login, senha }).then((resp) => {
      setLoginErrorMessage(resp);

      if (resp.message) {
        setIsLoading(false);
      }
    });
  };

  const onChangeField = () => {
    setLoginErrorMessage('');
  };

  return (
    <Wrap>
      <Logo size='big' />
      {isLoading ? (
        <Loader />
      ) : !isLogged ? (
        <Form onSubmit={onSubmit} schema={schema}>
          <Row>
            <Col md={6}>
              <Input
                className='form-control'
                type='text'
                name='login'
                id='login'
                placeholder='Login'
                onChange={onChangeField}
                onFocus={onChangeField}
                style={{ marginBottom: 10 }}
              />
            </Col>
            <Col md={6}>
              <Input
                className='form-control'
                type='password'
                name='senha'
                id='senha'
                placeholder='Senha'
                onChange={onChangeField}
                onFocus={onChangeField}
              />
            </Col>
          </Row>
          <Button
            type='submit'
            className='form-control'
            color='danger'
            style={{ backgroundColor: '#0054AD' }}
          >
            Login
          </Button>
        </Form>
      ) : (
        <Navigate to={{ pathname: '/admin' }} />
      )}
      {loginErrorMessage.message && (
        <Alert variant='danger'>{loginErrorMessage.message}</Alert>
      )}
    </Wrap>
  );
};

export default Login;
