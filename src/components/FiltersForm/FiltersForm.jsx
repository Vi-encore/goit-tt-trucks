import { useDispatch, useSelector } from 'react-redux';
import css from './FiltersForm.module.css';
import { useEffect } from 'react';
import { changeFilters, selectFilters } from '../../redux/filtersSlice';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { featuresOptions } from '../../data/featuresOptions';
import FilterCard from '../FilterCard/FilterCard';
import { vehicleTypes } from '../../data/vehicleTypes';
import Button from '../Button/Button';

const LocationSchema = Yup.object().shape({
  location: Yup.string(),
});

export default function FiltersForm() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    changeFilters({ location: '', form: '', features: [] });
  }, [dispatch]);

  return (
    <div className={css.container}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          location: filters.location || '',
          form: filters.form || '',
          features: filters.features || [],
        }}
        validationSchema={LocationSchema}
        onSubmit={values => {
          dispatch(changeFilters(values));
        }}
      >
        {errors => {
          return (
            <Form>
              <div>
                <label htmlFor="location">Location</label>
                <Field
                  name="location"
                  id="location"
                  type="text"
                  placeholder="City"
                />
                <svg width="16" height="16">
                  <use href="/icons.svg#icon-map" />
                </svg>
              </div>
              {errors.location && <p>{errors.location}</p>}
              <p>Filters</p>
              <div>
                <fieldset>
                  <legend>Vehicle equipment</legend>
                  <div>
                    {featuresOptions.map(feature => {
                      return (
                        <FilterCard
                          feature={feature}
                          key={feature.value}
                          name="features"
                          type="checkbox"
                        />
                      );
                    })}
                  </div>
                </fieldset>
              </div>
              <div>
                <fieldset>
                  <legend>Vehicle type</legend>
                  <div>
                    {vehicleTypes.map(type => {
                      return (
                        <FilterCard
                          feature={type}
                          key={type.value}
                          name="form"
                          type="radio"
                        />
                      );
                    })}
                  </div>
                </fieldset>
              </div>
              <Button text="Search" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
