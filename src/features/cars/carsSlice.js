import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';

export const initialState = {
  isLoading: false,
  car: {},
  cars: [],
  error: null,
};

const SERVER_URL = `${process.env.REACT_APP_URLBASEAPI ?? '/api'}`;

export const getAllCars = createAsyncThunk(
  `${SERVER_URL}/getAllCars`,
  async () => {
    return await apiClient.getAllCars();
  }
);

export const getCar = createAsyncThunk(
  `${SERVER_URL}/getCar`,
  async (payload) => {
    return await apiClient.getCar(payload);
  }
);

export const addCar = createAsyncThunk(
  `${SERVER_URL}/addCar`,
  async (payload) => {
    return await apiClient.addCar(payload);
  }
);

export const removeCar = createAsyncThunk(
  `${SERVER_URL}/removeCar`,
  async (payload) => {
    const { id } = payload;
    return await apiClient.removeCar(id);
  }
);

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
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
    // .addCase(removeCar.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(removeCar.fulfilled, (state, { payload }) => {
    //   state.isLoading = false;
    //   state.cars = state.cars.filter((carro) => carro.id !== payload.id);
    // })
    // .addCase(removeCar.rejected, (state, { error }) => {
    //   state.isLoading = true;
    //   state.error = error.message;
    // });
  },
});

export const { updateCar } = carsSlice.actions;

export default carsSlice.reducer;
