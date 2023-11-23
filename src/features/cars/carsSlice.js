import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';

export const initialState = {
  isLoading: false,
  car: {},
  cars: [],
  error: null,
};

export const getAllCars = createAsyncThunk('api/getAllCars', async () => {
  return await apiClient.getAllCars();
});

export const getCar = createAsyncThunk('api/getCar', async () => {
  return await apiClient.getCar();
});

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, { payload }) => {
      const newCar = payload;
      console.log(state.cars);
      const newState = {
        ...state,
        cars: [...state.cars, { id: String(state.cars.length + 1), ...newCar }],
      };
      console.log(newState.cars);
      return newState;
    },
    removeCar: (state, { payload }) => {
      const { id } = payload;
      const cars = state.cars.filter((carro) => carro.id !== id);
      return { ...state, cars };
    },
    updateCar: (state, { payload }) => {
      const { id, car: newCar } = payload;
      return {
        ...state,
        cars: [
          ...state.cars.map((car) => (car.id === id ? { ...newCar } : car)),
        ],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCars.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cars = payload;
      })
      .addCase(getAllCars.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(getCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.car = payload;
      })
      .addCase(getCar.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export const { addCar, removeCar, updateCar } = carsSlice.actions;

export default carsSlice.reducer;
