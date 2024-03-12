import { configureStore, combineReducers } from '@reduxjs/toolkit';

import carsSlice from './features/cars/carsSlice';
import fotosSlice from './features/fotos/fotosSlice';

const rootReducer = combineReducers({ cars: carsSlice, fotos: fotosSlice });

export const store = configureStore({ reducer: rootReducer });
