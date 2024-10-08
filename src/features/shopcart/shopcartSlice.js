/* eslint-disable eqeqeq */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants';

export const initialState = {
  isLoading: false,
  shopcart: [],
  error: null,
};

export const getShopcart = createAsyncThunk(
  `${SERVER_URL}/getAllShopcarts`,
  async () => []
);

export const addShopcartItem = createAsyncThunk(
  `${SERVER_URL}/addShopcart`,
  async (payload) => {
    return payload;
  }
);

export const removeShopcartItem = createAsyncThunk(
  `${SERVER_URL}/removeShopcart`,
  async (payload) => {
    return payload;
  }
);

export const cleanShopcart = createAsyncThunk(
  `${SERVER_URL}/cleanShopcart`,
  async (payload) => {
    return payload;
  }
);

export const shopcartSlice = createSlice({
  name: 'shopcart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShopcart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopcart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shopcart = payload;
      })
      .addCase(getShopcart.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(addShopcartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addShopcartItem.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const x = state.shopcart.filter(
          (item) => item.id.toString() == payload.id.toString()
        );
        if (x.length) {
          state.shopcart = state.shopcart.map((item) =>
            item.id.toString() == payload.id.toString()
              ? { ...item, quant: item.quant + payload.quant }
              : item
          );
        } else {
          state.shopcart.push(payload);
        }
      })
      .addCase(addShopcartItem.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(removeShopcartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeShopcartItem.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shopcart = state.shopcart.filter((item) => item.id !== payload);
      })
      .addCase(removeShopcartItem.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(cleanShopcart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cleanShopcart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shopcart = [];
      })
      .addCase(cleanShopcart.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export default shopcartSlice.reducer;
