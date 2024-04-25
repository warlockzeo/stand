import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';

import { SERVER_URL } from '../../utils/constants';

export const initialState = {
  isLoading: false,
  productFotos: [],
  error: null,
};

export const getAllProductFotos = createAsyncThunk(
  `${SERVER_URL}/getAllProductFotos`,
  async (payload) => {
    return await apiClient.getAllProductFotos(payload);
  }
);

export const addProductFoto = createAsyncThunk(
  `${SERVER_URL}/addProductFotos`,
  async (payload) => {
    return await apiClient.addProductFotos(payload);
  }
);

export const removeProductFoto = createAsyncThunk(
  `${SERVER_URL}/removeProductFoto`,
  async (payload) => {
    const { id } = payload;
    return await apiClient.removeProductFoto(id);
  }
);

export const selectProductFoto = createAsyncThunk(
  `${SERVER_URL}/selectProductFoto`,
  async (payload) => {
    const { id } = payload;
    return await apiClient.selectProductFoto(id);
  }
);

export const fotosSlice = createSlice({
  name: 'fotos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductFotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductFotos.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.productFotos = payload;
      })
      .addCase(getAllProductFotos.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(addProductFoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductFoto.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addProductFoto.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(removeProductFoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.productFotos = state.productFotos.filter(
          (foto) => foto.id !== String(payload.id)
        );
      })
      .addCase(removeProductFoto.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(selectProductFoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectProductFoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(selectProductFoto.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export default fotosSlice.reducer;
