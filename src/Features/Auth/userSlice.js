import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import userApi from '../../api/userApi';
import Storagekey from '../../constants/storage-key';

export const register = createAsyncThunk('user/register', async (payload, thunkAPI) => {
  const { data } = await userApi.register(payload);
  localStorage.setItem(Storagekey.TOKEN, data.jwt);
  localStorage.setItem(Storagekey.USER, JSON.stringify(data.user));
  return data.user;
});

export const login = createAsyncThunk('users/login', async (payload, thunkAPI) => {
  // call api
  const { data } = await userApi.login(payload);
  // save data storage
  localStorage.setItem(Storagekey.TOKEN, data.jwt);
  localStorage.setItem(Storagekey.USER, JSON.stringify(data.user));
  // return data
  return data.user;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    setting: {},
    current: JSON.parse(localStorage.getItem(Storagekey.USER)) || {},
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem(Storagekey.TOKEN);
      localStorage.removeItem(Storagekey.USER);
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(register.fulfilled, (state, action) => {
      // Add user to the state array
      state.current = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // Add user to the state array
      state.current = action.payload;
    });
  },
});

export const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
