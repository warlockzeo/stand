import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';

export const initialState = {
  isLoading: false,
  cars: [],
  error: null,
};

export const getAllCars = createAsyncThunk('api/getAllCars', async () => {
  return await apiClient.getAllCars();
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
      });
  },
});

export const { addCar, removeCar, updateCar } = carsSlice.actions;

export default carsSlice.reducer;
