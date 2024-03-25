import { configureStore, combineReducers } from '@reduxjs/toolkit';

import carsSlice from './features/cars/carsSlice';
import fotosSlice from './features/fotos/fotosSlice';
import usersSlice from './features/users/usersSlice';
import settingsSlice from './features/settings/settingsSlice';

const rootReducer = combineReducers({
  cars: carsSlice,
  fotos: fotosSlice,
  users: usersSlice,
  settings: settingsSlice,
});

export const store = configureStore({ reducer: rootReducer });
