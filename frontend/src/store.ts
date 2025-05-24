import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { checkoutReducer } from './features/checkoutSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    checkout: checkoutReducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 