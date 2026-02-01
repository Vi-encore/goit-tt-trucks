import { useSelector } from 'react-redux';
import css from './CatalogPage.module.css';
import FiltersForm from '../../components/FiltersForm/FiltersForm';
import CampersList from '../../components/CampersList/CampersList';
import { selectError, selectLoading } from '../../redux/campers/campersSlice';
import Loader from '../../components/Loader/Loader';
import { selectFilters } from '../../redux/filters/filtersSlice';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

export default function CatalogPage() {
  const isLoading = useSelector(selectLoading);
  const filters = useSelector(selectFilters);
  const filterKey = JSON.stringify(filters);
  const error = useSelector(selectError);

  return (
    <>
      {error ? (
        <NotFoundPage text="Something went wrong!" />
      ) : (
        <div className={css.container}>
          {isLoading && <Loader />}
          <FiltersForm />
          <CampersList key={filterKey} />
        </div>
      )}
    </>
  );
}
