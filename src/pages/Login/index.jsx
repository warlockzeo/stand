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
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  input {
    margin-bottom: 10px;
  }
`;

const schema = Yup.object().shape({
  login: Yup.string().required('Precisa informar um login'),
  password: Yup.string().required('Precisa informar uma password'),
});

const Login = () => {
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ login, password }) => {
    setIsLoading(true);
    await submitLogin({ login, password }).then((resp) => {
      setLoginErrorMessage(resp);

      if (resp?.error) {
        setIsLoading(false);
      } else {
        window.location.href = '/login';
      }
    });
  };

  const onChangeField = () => {
    setLoginErrorMessage('');
  };

  return (
    <Wrap>
      <Logo size='small' />
      {isLoading ? (
        <Loader />
      ) : isLogged ? (
        <Navigate to='/admin' />
      ) : (
        <Form onSubmit={onSubmit} schema={schema}>
          <Row>
            <Col sm={6}>
              <Input
                className='form-control'
                type='text'
                name='login'
                id='login'
                placeholder='Login'
                onChange={onChangeField}
                onFocus={onChangeField}
              />
            </Col>
            <Col sm={6}>
              <Input
                className='form-control'
                type='password'
                name='password'
                id='password'
                placeholder='password'
                onChange={onChangeField}
                onFocus={onChangeField}
              />
            </Col>
          </Row>

          <Button
            type='submit'
            className='col-12'
            color='danger'
            style={{ backgroundColor: '#0054AD' }}
          >
            Login
          </Button>
        </Form>
      )}

      {loginErrorMessage?.error && (
        <Alert variant='danger'>{loginErrorMessage?.error}</Alert>
      )}
    </Wrap>
  );
};

export default Login;
