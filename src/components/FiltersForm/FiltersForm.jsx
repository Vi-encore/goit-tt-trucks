import { useDispatch, useSelector } from 'react-redux';
import css from './FiltersForm.module.css';
import { useEffect } from 'react';
import { changeFilters, selectFilters } from '../../redux/filters/filtersSlice';
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
    dispatch(changeFilters({ location: '', form: '', features: [] }));
  }, [dispatch]);

  return (
    <div className={css.container}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          location: filters.location ?? '',
          form: filters.form ?? '',
          features: filters.features ?? [],
        }}
        validationSchema={LocationSchema}
        onSubmit={values => {
          dispatch(changeFilters(values));
        }}
      >
        {({ errors }) => {
          return (
            <Form className={css.form}>
              <div className={css['location-container']}>
                <label htmlFor="location">Location</label>
                <div className={css.location}>
                  <Field
                    name="location"
                    id="location"
                    type="text"
                    placeholder="City"
                    className={css['location-field']}
                  />
                  <svg width="16" height="16" className={css.icon}>
                    <use href="/icons.svg#icon-map" />
                  </svg>
                </div>
              </div>
              {errors.location && (
                <p className={css.error}>{errors.location}</p>
              )}
              <p className={css['filters-text']}>Filters</p>
              <div>
                <fieldset className={css['field']}>
                  <legend className={css['filters-name']}>
                    Vehicle equipment
                  </legend>
                  <div className={css['filters-group']}>
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
                <fieldset className={css['field']}>
                  <legend className={css['filters-name']}>Vehicle type</legend>
                  <div className={css['filters-group']}>
                    {vehicleTypes.map(type => {
                      return (
                        <FilterCard
                          feature={type}
                          key={type.value}
                          name="form"
                          id="form"
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
