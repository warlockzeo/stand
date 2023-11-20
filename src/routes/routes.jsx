import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import CarDetails from '../pages/CarDetails';
import Admin from '../pages/Admin';
import EditViaturas from '../pages/Admin/EditViatura';
import NoMatchPage from '../pages/NoMatchPage';

const Routes = () => (
  <Switch>
    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/admin/' element={<PrivateRoute element={<Admin />} />} />
    <Route path='/car/:id' element={<CarDetails />} />
    <Route
      path='/admin/viaturas'
      element={<PrivateRoute element={<Admin />} />}
    />
    <Route
      path='/admin/viaturas/new'
      element={<PrivateRoute element={<EditViaturas />} />}
    />
    <Route
      path='/admin/viaturas/:id'
      element={<PrivateRoute element={<EditViaturas />} />}
    />
    <Route path='*' element={<NoMatchPage />} />
  </Switch>
);

export default Routes;
