import { configureStore } from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice';


const store = configureStore({
  reducer: {
    auth: auth,
  },
});

export default store;
