import { useDispatch, useSelector } from 'react-redux';
import css from './CampersList.module.css';
import { useEffect, useRef, useState } from 'react';
import { fetchCampers } from '../../redux/campers/campersOps';
import CamperCard from '../../components/CamperCard/CamperCard';
import {
  changeFilters,
  selectFilteredTrucks,
} from '../../redux/filters/filtersSlice';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { selectLoading } from '../../redux/campers/campersSlice';
import SecondaryButton from '../SecondaryButton/SecondaryButton';

export default function CampersList() {
  const loadMoreBtnRef = useRef(null);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const campers = useSelector(selectFilteredTrucks);

  const itemsPerPage = 4;
  const visibleCampers = campers.slice(0, page * itemsPerPage) || [];
  const hasMore = visibleCampers.length < campers.length;

  function handleLoadMore() {
    setPage(prevPage => prevPage + 1);
  }

  function handleReset() {
    dispatch(changeFilters({ location: '', form: '', features: [] }));
  }

  useEffect(() => {
    if (page > 1) {
      loadMoreBtnRef.current?.scrollIntoView({
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
          <Button onClick={handleReset} text="Reset filters" />
        </div>
      )}
      {isLoading && <Loader />}
      <ul className={css.list}>
        {visibleCampers.length > 0 &&
          visibleCampers.map(camper => {
            return <CamperCard camper={camper} key={camper.id} />;
          })}
      </ul>
      {hasMore && (
        <SecondaryButton
          onClick={handleLoadMore}
          ref={loadMoreBtnRef}
          text="Load More"
        />
      )}
    </div>
  );
}

//add loading +suspense+outlet etc
