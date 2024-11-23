import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/productListSlice';
import userReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import searchReducer from '../features/search/searchSlice';
export const store = configureStore({
  reducer: {
    product: productReducer ,
    user : userReducer,
    cart : cartReducer,
    order : orderReducer,
    search : searchReducer,
  },
});
