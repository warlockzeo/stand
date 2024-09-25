/* eslint-disable eqeqeq */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiClient from '../../utils/apiClient';
import { SERVER_URL } from '../../utils/constants';

export const initialState = {
  isLoading: false,
  product: {},
  products: [],
  error: null,
};

export const getAllProducts = createAsyncThunk(
  `${SERVER_URL}/getAllProducts`,
  async () => {
    return await apiClient.getAllProducts();
  }
);

export const addProduct = createAsyncThunk(
  `${SERVER_URL}/addProduct`,
  async (payload) => {
    return await apiClient.addProduct(payload);
  }
);

export const updateProduct = createAsyncThunk(
  `${SERVER_URL}/updateProduct`,
  async (payload) => {
    return await apiClient.updateProduct(payload);
  }
);

export const removeProduct = createAsyncThunk(
  `${SERVER_URL}/removeProduct`,
  async (payload) => {
    return await apiClient.removeProduct(payload.id);
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getCar: (state, { payload }) => {
      const { id } = payload;
      return {
        ...state,
        product: {
          ...state.products.filter(
            (product) => product.id.toString() == id.toString()
          ),
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload;
      })
      .addCase(getAllProducts.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = [...state.products, payload];
      })
      .addCase(addProduct.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      })
      .addCase(removeProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = state.products.filter(
          (product) => product.id !== String(payload.id)
        );
      })
      .addCase(removeProduct.rejected, (state, { error }) => {
        state.isLoading = true;
        state.error = error.message;
      });
  },
});

export const { getProduct } = productsSlice.actions;

export default productsSlice.reducer;
