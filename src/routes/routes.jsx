import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Loja from '../pages/Loja';
import Oficina from '../pages/Oficina';
import CarDetails from '../pages/CarDetails';
import Admin from '../pages/Admin';
import EditViaturas from '../pages/Admin/EditViatura';
import Settings from '../pages/Admin/Settings';
import AdminOficina from '../pages/Admin/Oficina';
import Products from '../pages/Admin/Products';
import EditProducts from '../pages/Admin/EditProducts';
import Users from '../pages/Admin/Users';
import EditUser from '../pages/Admin/EditUser';
import NoMatchPage from '../pages/NoMatchPage';

const Routes = () => (
  <Switch>
    <Route path='/' element={<Home />} />
    <Route path='/home' element={<Home />} />
    <Route path='/car/:id' element={<CarDetails />} />
    <Route path='/login' element={<Login />} />
    <Route path='/loja' element={<Loja />} />
    <Route path='/oficina' element={<Oficina />} />
    <Route path='/admin/' element={<PrivateRoute element={<Admin />} />} />
    <Route
      path='/admin/footer'
      element={<PrivateRoute element={<Settings />} />}
    />
    <Route
      path='/admin/oficina'
      element={<PrivateRoute element={<AdminOficina />} />}
    />
    <Route
      path='/admin/loja-produtos'
      element={<PrivateRoute element={<Products />} />}
    />
    <Route
      path='/admin/products/new'
      element={<PrivateRoute element={<EditProducts />} />}
    />
    <Route
      path='/admin/products/:id'
      element={<PrivateRoute element={<EditProducts />} />}
    />
    <Route
      path='/admin/loja-vendas'
      element={<PrivateRoute element={<Settings />} />}
    />
    <Route path='/admin/users' element={<PrivateRoute element={<Users />} />} />
    <Route
      path='/admin/users/new'
      element={<PrivateRoute element={<EditUser />} />}
    />
    <Route
      path='/admin/users/:id'
      element={<PrivateRoute element={<EditUser />} />}
    />
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
