import { useDispatch, useSelector } from 'react-redux';
import css from './FiltersForm.module.css';
import { useEffect } from 'react';
import { changeFilters, selectFilters } from '../../redux/filtersSlice';
import * as Yup from 'yup';

const LocationSchema = Yup.object().shape({
  location: Yup.string(),
});

export default function FiltersForm() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    changeFilters({ location: '', form: '', features: [] });
  }, [dispatch]);

  return <div className={css.container}>I am form</div>;
}
