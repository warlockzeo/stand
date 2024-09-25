import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';

import { SERVER_URL } from '../../utils/constants';

export const initialState = {
  isLoading: false,
  fotos: [],
  error: null,
};

export const getAllFotos = createAsyncThunk(
  `${SERVER_URL}/getAllFotos`,
  async (payload) => {
    return await apiClient.getAllFotos(payload);
  }
);

export const addFoto = createAsyncThunk(
  `${SERVER_URL}/addFotos`,
  async (payload) => {
    return await apiClient.addFotos(payload);
  }
);

export const removeFoto = createAsyncThunk(
  `${SERVER_URL}/removeFoto`,
  async (payload) => {
    const { id } = payload;
    return await apiClient.removeFoto(id);
  }
);

export const selectFoto = createAsyncThunk(
  `${SERVER_URL}/selectFoto`,
  async (payload) => {
    const { id } = payload;
    return await apiClient.selectFoto(id);
  }
);

export const fotosSlice = createSlice({
  name: 'fotos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFotos.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.fotos = payload;
      })
      .addCase(getAllFotos.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(addFoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFoto.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addFoto.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(removeFoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.fotos = state.fotos.filter(
          (foto) => foto.id !== String(payload.id)
        );
      })
      .addCase(removeFoto.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(selectFoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectFoto.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(selectFoto.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export default fotosSlice.reducer;
