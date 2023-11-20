import { configureStore, combineReducers } from '@reduxjs/toolkit';

import carsSlice from './features/cars/carsSlice';

const rootReducer = combineReducers({ cars: carsSlice });

export const store = configureStore({ reducer: rootReducer });
