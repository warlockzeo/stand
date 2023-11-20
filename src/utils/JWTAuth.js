/* eslint-disable no-undef */
import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
//import jwt from 'jwt-decode';
//const SERVER_URL = 'http://protocolo.v2.api';
const SERVER_URL = `${process.env.REACT_APP_URLBASEAPI}`;

const login = async (data) => {
  const LOGIN_ENDPOINT = `${SERVER_URL}/login`;
  try {
    let response = await axios({
      method: 'post',
      responseType: 'json',
      url: LOGIN_ENDPOINT,
      data: JSON.stringify(data),
    });

    if (
      response.status === 200 &&
      response.data.jwt &&
      response.data.expireAt
    ) {
      let tokenJwt = response.data.jwt;
      let expire_at = response.data.expireAt;

      sessionStorage.setItem('access_token', tokenJwt);
      sessionStorage.setItem('expire_at', expire_at); //dias para expirar
      console.log('Loged In');

      window.location.href = '/';
      return <Navigate to={{ pathname: '/' }} />;
    }
  } catch (e) {
    return { message: 'Usuario ou senha inválidos' };
  }

  sessionStorage.setItem('access_token', 'OK');
  window.location.href = '/admin';
  return <Navigate to={{ pathname: '/admin' }} />;
};

const logout = () => {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('expire_at');
  console.log('Loged Out');
  window.location.href = '/login';
  return <Navigate to={{ pathname: '/login' }} />;
};

const userAuth = sessionStorage.getItem('access_token');

const isAuthenticated = () => !!userAuth;

const isLogged = !!sessionStorage.getItem('access_token');

export { login, logout, isAuthenticated, isLogged, userAuth };
