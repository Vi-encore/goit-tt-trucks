import { useDispatch, useSelector } from 'react-redux';
import css from './CampersList.module.css';
import { useEffect, useRef, useState } from 'react';
import { fetchCampers } from '../../redux/campers/campersOps';
import CamperCard from '../../components/CamperCard/CamperCard';
import {
  changeFilters,
  selectFilteredTrucks,
} from '../../redux/filters/filtersSlice';
import SecondaryButton from '../SecondaryButton/SecondaryButton';

export default function CampersList() {
  const listEndRef = useRef(null);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const campers = useSelector(selectFilteredTrucks);

  const itemsPerPage = 4;
  const visibleCampers = campers.slice(0, page * itemsPerPage) || [];
  const hasMore = visibleCampers.length < campers.length;

  function handleLoadMore() {
    setPage(prevPage => prevPage + 1);
  }

  function handleReset() {
    window.scrollTo(0, 0);
    dispatch(changeFilters({ location: '', form: '', features: [] }));
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
      {campers.length === 0 && (
        <div className={css['not-found-wrap']}>
          <p className={css['not-found']}>No matching campers found!</p>
          <SecondaryButton onClick={handleReset} text="Reset filters" />
        </div>
      )}

      <ul className={css.list}>
        {visibleCampers.length > 0 &&
          visibleCampers.map(camper => {
            return <CamperCard camper={camper} key={camper.id} />;
          })}
      </ul>
      <div className={css['scroll-marker']} ref={listEndRef}></div>
      {hasMore && <SecondaryButton onClick={handleLoadMore} text="Load More" />}
    </div>
  );
}
