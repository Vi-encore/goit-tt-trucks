import { createSelector, createSlice } from '@reduxjs/toolkit';
import { selectCampers } from '../campers/campersSlice';

const slice = createSlice({
  name: 'filters',
  initialState: { features: [], type: '', location: '' },
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
    const searchLocation = locationFilter.toLowerCase();

    return campers.filter(({ location, form, transmission, ...features }) => {
      const matchesLocation = location.toLowerCase().includes(searchLocation);
      const matchesForm = !formFilter || form === formFilter;

      const matchesFeatures = featuresFilter.every(feature => {
        if (feature === 'automatic') return transmission === 'automatic';
        return !!features[feature];
      });

      return matchesLocation && matchesForm && matchesFeatures;
    });
  }
);
//??
