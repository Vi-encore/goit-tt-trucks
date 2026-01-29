import { configureStore } from '@reduxjs/toolkit';
import { campersSliceReducer } from './campersSlice';

export const store = configureStore({
  reducer: {
    campers: campersSliceReducer,
    filters: '',
    favorites: '',
  },
});
