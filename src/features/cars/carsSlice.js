import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';
import { SERVER_URL } from '../../utils/constants';

export const initialState = {
  isLoading: false,
  car: {},
  cars: [],
  error: null,
};

export const getAllCars = createAsyncThunk(
  `${SERVER_URL}/getAllCars`,
  async () => {
    return await apiClient.getAllCars();
  }
);

export const addCar = createAsyncThunk(
  `${SERVER_URL}/addCar`,
  async (payload) => {
    return await apiClient.addCar(payload);
  }
);

export const updateCar = createAsyncThunk(
  `${SERVER_URL}/updateCar`,
  async (payload) => {
    return await apiClient.updateCar(payload);
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
    getCar: (state, { payload }) => {
      const { id } = payload;
      return {
        ...state,
        car: { ...state.cars.filter((xcar) => xcar.id === id) },
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
      .addCase(addCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cars = [...state.cars, payload];
      })
      .addCase(addCar.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(updateCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cars = [
          ...state.cars.map((car) => {
            return car.id === payload.id ? payload : car;
          }),
          payload,
        ];
      })
      .addCase(updateCar.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(removeCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cars = state.cars.filter(
          (carro) => carro.id !== String(payload.id)
        );
      })
      .addCase(removeCar.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export const { getCar } = carsSlice.actions;

export default carsSlice.reducer;
