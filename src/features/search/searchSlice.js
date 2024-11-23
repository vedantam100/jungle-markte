import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFilteredProducts, fetchSearchedProducts } from './searchAPI';

const initialState = {
  value: 0,
  status: 'idle',
  products: null,
  filterProudcts: null
};

export const fetchSearchedProductsAsync = createAsyncThunk(
  "search/fetchSearchedProducts",
  async (query) => {
    const response = await fetchSearchedProducts(query);
    return response.data;
  }
);
export const fetchFilteredProductsAsync = createAsyncThunk(
  "search/fetchFilteredProducts",
  async ({product ,filter , option}) => {
    // console.log(filter,option)
    const response = await fetchFilteredProducts(product , filter , option);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSearchedProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
        state.filterProudcts = action.payload;
      })
      .addCase(fetchFilteredProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        state.filterProudcts["products"] = action.payload;
      });
      
  },
});

export const { increment } = searchSlice.actions;
export const selectCount = (state) => state.search.value;
export const selectSearchedProducts = (state) => state.search.products;
export const selectFilteredProducts = (state) => state.search.filterProudcts;

export default searchSlice.reducer;