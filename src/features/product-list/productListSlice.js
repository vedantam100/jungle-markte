import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { creatProduct, deleteProductById, fetchAllProducts,fetchBrands,fetchCategories,fetchProductsByFilters, fetchSelectedProduct } from './productListAPI';

const initialState = {
  products: [],
  brands :[],
  categories :[],
  selectAllProducts: {},
  status: 'idle',
  totalItems:0
  
};

function debounce(func, delay) {
  let timerId;
  
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  // console.log("error"),
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination}) => {
    // console.log("error")
    const response = await fetchProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const debouncedFetchProductsByFiltersAsync = debounce(fetchProductsByFiltersAsync, 500);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands()
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories()
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchSelectedProductAsync = createAsyncThunk(
  'product/fetchSelectedProduct',
  async (id) => {
    const response = await fetchSelectedProduct(id);
    return response.data;
  }
);
export const createProductAsync = createAsyncThunk(
  'product/creatProduct',
  async (productInfo) => {
    const response = await creatProduct(productInfo);
    return response.data;
  }
);

export const deleteProductByIdAsync = createAsyncThunk(
  'product/deleteProductById',
  async (productId) => {
    const response = await deleteProductById(productId);
    console.log(response.data);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchSelectedProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSelectedProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedproduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload) ;
      })
      .addCase(deleteProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload) ;
      })
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectSelectedProduct = (state) => state.product.selectedproduct;

export default productSlice.reducer;