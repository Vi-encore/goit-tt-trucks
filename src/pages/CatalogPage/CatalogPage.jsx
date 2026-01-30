import { useSelector } from 'react-redux';
import css from './CatalogPage.module.css';
import { MoonLoader } from 'react-spinners';
import FiltersForm from '../../components/FiltersForm/FiltersForm';
import CampersList from '../../components/CampersList/CampersList';
import { selectLoading } from '../../redux/campers/campersSlice';

export default function CatalogPage() {
  const isLoading = useSelector(selectLoading);

  return (
    <div className={css.container}>
      {isLoading && (
        <MoonLoader
          color="#d15065"
          cssOverride={{ margin: '20px 0' }}
          size="80px"
        />
      )}
      <FiltersForm />
      <CampersList />
    </div>
  );
}

//fix loader???
