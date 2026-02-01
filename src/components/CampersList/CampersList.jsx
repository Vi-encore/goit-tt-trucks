import { useDispatch, useSelector } from 'react-redux';
import css from './CampersList.module.css';
import { useEffect, useRef, useState } from 'react';
import { fetchCampers } from '../../redux/campers/campersOps';
import CamperCard from '../../components/CamperCard/CamperCard';
import { selectFilteredTrucks } from '../../redux/filters/filtersSlice';
import Loader from '../Loader/Loader';

export default function CampersList() {
  const loadMoreBtnRef = useRef(null);
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

  useEffect(() => {
    if (page > 1) {
      loadMoreBtnRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [visibleCampers.length, page]);

  
  if (campers.length === 0) return <p>No Items found.</p>;

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {visibleCampers.length > 0 &&
          visibleCampers.map(camper => {
            return <CamperCard camper={camper} key={camper.id} />;
          })}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={handleLoadMore}
          ref={loadMoreBtnRef}
          className={css['show-more-btn']}
        >
          Load More
        </button>
      )}
    </div>
  );
}

//add loading +suspense+outlet etc
