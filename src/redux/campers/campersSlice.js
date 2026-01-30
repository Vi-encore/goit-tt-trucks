import { createSlice } from '@reduxjs/toolkit';
import { fetchCamperById, fetchCampers } from './campersOps';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const camperSlice = createSlice({
  name: 'campers',
  initialState: { items: [], loading: false, error: null },
  extraReducers: builder => {
    builder
      .addCase(fetchCampers.rejected, handleRejected)
      .addCase(fetchCampers.pending, handlePending)
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.items;
      })
      //???? whattt
      .addCase(fetchCamperById.rejected, handleRejected)
      .addCase(fetchCamperById.pending, handlePending)
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      });
  },
});

export const campersSliceReducer = camperSlice.reducer;

// selectors
export const selectCampers = state => state.campers.items;
export const selectLoading = state => state.campers.loading;
export const selectError = state => state.campers.error;
