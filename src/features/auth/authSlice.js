import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LogOutUser, authUser, checkUser, createUser, forgetPassword } from './AuthAPI';

const initialState = {
  loggedInUser: null,
  mail : null,
  userInfo : null,
  status: 'idle',
  message : null
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "user/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);
export const LogOutUserAsync = createAsyncThunk(
  "user/LogOutUser",
  async (userId) => {
    const response = await LogOutUser(userId);
    return response.data;
  }
);
export const forgetPasswordAsync = createAsyncThunk(
  "user/forgetPassword",
  async (email) => {
    const response = await forgetPassword(email);
    return response.data;
  }
);
export const authUserAsync = createAsyncThunk(
  "user/authUser",
  async () => {
    const response = await authUser();
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(LogOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LogOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = null;
      })
      .addCase(forgetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mail = action.payload;
      })
      .addCase(authUserAsync.pending, (state) => {
        state.message = 'loading';
      })
      .addCase(authUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = action.payload;
      })
  }
});

export const { increment } = userSlice.actions;

export const selectLoggedUser = (state) => state.user.loggedInUser;
export const selectCheckUser = (state) => state.user.userInfo;
export const selectmail = (state) => state.user.mail;
export const selectmessage = (state) => state.user.message;
export default userSlice.reducer;
