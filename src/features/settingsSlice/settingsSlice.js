import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';
import { SERVER_URL } from '../../utils/constants';

export const initialState = {
  isLoading: false,
  settings: {},
  error: null,
};

export const getAllsettings = createAsyncThunk(
  `${SERVER_URL}/getAllsettings`,
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
      .addCase(getAllsettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllsettings.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.settings = payload[0];
      })
      .addCase(getAllsettings.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSettings.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.settings = payload[0];
      })
      .addCase(updateSettings.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export default settingsSlice.reducer;
