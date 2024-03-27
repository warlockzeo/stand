import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';
import { SERVER_URL } from '../../utils/constants';

export const initialState = {
  isLoading: false,
  settings: {},
  error: null,
};

export const getAllSettings = createAsyncThunk(
  `${SERVER_URL}/getAllSettings`,
  async () => {
    return await apiClient.getAllSettings();
  }
);

export const updateSettings = createAsyncThunk(
  `${SERVER_URL}/updateSettings`,
  async (payload) => {
    return await apiClient.updateSettings(payload);
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSettings.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.settings = payload;
      })
      .addCase(getAllSettings.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSettings.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.settings = payload;
      })
      .addCase(updateSettings.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export default settingsSlice.reducer;
