import { useDispatch, useSelector } from 'react-redux';
import css from './CampersList.module.css';
import { useEffect, useRef } from 'react';
import { fetchCampers } from '../../redux/campers/campersOps';
import CamperCard from '../../components/CamperCard/CamperCard';
import {
  changeFilters,
  selectFilteredTrucks,
} from '../../redux/filters/filtersSlice';
import SecondaryButton from '../SecondaryButton/SecondaryButton';
import { selectError } from '../../redux/campers/campersSlice';
import { PuffLoader } from 'react-spinners';

export default function CampersList({ page, setPage, isFiltering, setIsFiltering }) {
  const listEndRef = useRef(null);
  const dispatch = useDispatch();
  const campers = useSelector(selectFilteredTrucks);

  const itemsPerPage = 4;
  const visibleCampers = campers.slice(0, page * itemsPerPage) || [];
  const hasMore = visibleCampers.length < campers.length;
  const error = useSelector(selectError);

  function handleLoadMore() {
    setPage(prevPage => prevPage + 1);
  }

  function handleReset() {
    window.scrollTo(0, 0);
    setIsFiltering(true);
    dispatch(changeFilters({ location: '', form: '', features: [] }));
    setTimeout(() => {
        setIsFiltering(false);
      }, 500);
  }

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  useEffect(() => {
    if (page > 1) {
      listEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [visibleCampers.length, page]);

  return (
    <div className={css.container}>
      {isFiltering && (
        <div className={css['loader-container']}>
          <PuffLoader color="#e44848" size="150px" className={css.loader} />
        </div>
      )}
      {campers.length === 0 && !error && !isFiltering && (
        <div className={css['not-found-wrap']}>
          <p className={css['not-found']}>No matching campers found!</p>
          <SecondaryButton onClick={handleReset} text="Reset filters" />
        </div>
      )}

      {!isFiltering && (
        <>
          <ul className={css.list}>
            {visibleCampers.length > 0 &&
              visibleCampers.map(camper => {
                return <CamperCard camper={camper} key={camper.id} />;
              })}
          </ul>
          <div className={css['scroll-marker']} ref={listEndRef}></div>
          {hasMore && (
            <SecondaryButton onClick={handleLoadMore} text="Load More" />
          )}
        </>
      )}
    </div>
  );
}
