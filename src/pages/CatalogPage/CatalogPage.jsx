import { useSelector } from 'react-redux';
import css from './CatalogPage.module.css';
import FiltersForm from '../../components/FiltersForm/FiltersForm';
import CampersList from '../../components/CampersList/CampersList';
import { selectError, selectLoading } from '../../redux/campers/campersSlice';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { useState } from 'react';

export default function CatalogPage() {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [page, setPage] = useState(1);

  return (
    <>
      {error ? (
        <NotFoundPage text="Something went wrong!" />
      ) : (
        <div className={css.container}>
          {isLoading && <Loader />}
          <FiltersForm resetPage={()=>setPage(1)}/>
          <CampersList page={page} setPage={setPage} />
        </div>
      )}
    </>
  );
}
