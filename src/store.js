import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Features/Auth/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
