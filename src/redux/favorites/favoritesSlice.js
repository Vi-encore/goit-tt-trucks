import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    toggleFavorite(state, { payload }) {
      state.items.includes(payload)
        ? (state.items = state.items.filter(id => id !== payload))
        : state.items.push(payload);
    },
  },
});

export const favoritesSliceReducer = slice.reducer;
export const { toggleFavorite } = slice.actions;

export const selectFavorites = state => state.favorites.items;
