import { useSelector } from 'react-redux';
import css from './CatalogPage.module.css';
import FiltersForm from '../../components/FiltersForm/FiltersForm';
import CampersList from '../../components/CampersList/CampersList';
import { selectLoading } from '../../redux/campers/campersSlice';
import Loader from '../../components/Loader/Loader';

export default function CatalogPage() {
  const isLoading = useSelector(selectLoading);

  return (
    <div className={css.container}>
      {isLoading && (
        <Loader />
      )}
      <FiltersForm />
      <CampersList />
    </div>
  );
}

//fix loader???
