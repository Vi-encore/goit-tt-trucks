import { configureStore } from '@reduxjs/toolkit';
import { campersSliceReducer } from './campers/campersSlice';
import { filtersSliceReducer } from './filters/filtersSlice';
import { favoritesSliceReducer } from './favorites/favoritesSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const favoritesConfigPersist = {
  key: 'favorites',
  storage,
  whitelist: ['items'],
};

export const store = configureStore({
  reducer: {
    campers: campersSliceReducer,
    filters: filtersSliceReducer,
    favorites: persistReducer(favoritesConfigPersist, favoritesSliceReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
