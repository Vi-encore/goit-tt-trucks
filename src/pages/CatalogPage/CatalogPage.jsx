import { useSelector } from 'react-redux';
import css from './CatalogPage.module.css';
import FiltersForm from '../../components/FiltersForm/FiltersForm';
import CampersList from '../../components/CampersList/CampersList';
import { selectLoading } from '../../redux/campers/campersSlice';
import Loader from '../../components/Loader/Loader';
import { selectFilters } from '../../redux/filters/filtersSlice';

export default function CatalogPage() {
  const isLoading = useSelector(selectLoading);
  const filters = useSelector(selectFilters);
  const filterKey = JSON.stringify(filters);

  return (
    <div className={css.container}>
      {isLoading && <Loader />}
      <FiltersForm />
      <CampersList key={filterKey} />
    </div>
  );
}
