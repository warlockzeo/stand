import { configureStore, combineReducers } from '@reduxjs/toolkit';

import carsSlice from './features/cars/carsSlice';
import fotosSlice from './features/fotos/fotosSlice';
import usersSlice from './features/users/usersSlice';
import settingsSlice from './features/settings/settingsSlice';
import productsSlice from './features/products/productsSlice';
import productFotosSlice from './features/productFotos/productFotosSlice';
import shopcartSlice from './features/shopcart/shopcartSlice';

const rootReducer = combineReducers({
  cars: carsSlice,
  fotos: fotosSlice,
  users: usersSlice,
  products: productsSlice,
  productFotos: productFotosSlice,
  settings: settingsSlice,
  shopcart: shopcartSlice,
});

export const store = configureStore({ reducer: rootReducer });
