import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';
import { SERVER_URL } from '../../utils/constants';

export const initialState = {
  isLoading: false,
  users: [],
  error: null,
};

export const getAllUsers = createAsyncThunk(
  `${SERVER_URL}/getAllUsers`,
  async () => {
    return await apiClient.getAllUsers();
  }
);

export const addUsers = createAsyncThunk(
  `${SERVER_URL}/addUsers`,
  async (payload) => {
    return await apiClient.addUsers(payload);
  }
);

export const updateUser = createAsyncThunk(
  `${SERVER_URL}/updateUser`,
  async (payload) => {
    return await apiClient.updateUser(payload);
  }
);

export const removeUser = createAsyncThunk(
  `${SERVER_URL}/removeUser`,
  async (payload) => {
    return await apiClient.removeUser(payload.id);
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload;
      })
      .addCase(getAllUsers.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(addUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = [...state.users, payload];
      })
      .addCase(addUsers.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = [
          ...state.users.map((user) => {
            return user.id === payload.id ? payload : user;
          }),
          payload,
        ];
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = state.users.filter(
          (user) => user.id !== String(payload.id)
        );
      })
      .addCase(removeUser.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export default usersSlice.reducer;
