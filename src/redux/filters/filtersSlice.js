import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectCampers } from '../campers/campersSlice';

const slice = createSlice({
  name: 'filters',
  initialState: { features: [], form: '', location: '' },
  reducers: {
    changeFilters(state, action) {
      state.form = action.payload.form;
      state.location = action.payload.location;
      state.features = action.payload.features;
    },
  },
});

export const { changeFilters } = slice.actions;
export const filtersSliceReducer = slice.reducer;

//selectors

export const selectLocationFilter = state => state.filters.location;
export const selectFormFilter = state => state.filters.form;
export const selectFeaturesFilter = state => state.filters.features;
export const selectFilters = state => state.filters;

export const selectFilteredTrucks = createSelector(
  [selectCampers, selectLocationFilter, selectFormFilter, selectFeaturesFilter],
  (campers, locationFilter, formFilter, featuresFilter) => {
    if (!Array.isArray(campers)) return [];

    const searchLocation = locationFilter.toLowerCase();

    return campers.filter(camper => {
      const matchesLocation = camper.location
        .toLowerCase()
        .includes(searchLocation.trim().toLowerCase());
      const matchesForm = !formFilter || camper.form === formFilter;
      const matchesFeatures = featuresFilter.every(feature => {
        if (feature === 'automatic') {
          return camper['transmission'] === 'automatic';
        }
        return camper[feature] === true;
      });

      return matchesLocation && matchesForm && matchesFeatures;
    });
  }
);

