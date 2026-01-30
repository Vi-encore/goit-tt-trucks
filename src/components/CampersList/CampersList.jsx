import { useDispatch, useSelector } from 'react-redux';
import css from './CampersList.module.css';
import { useEffect, useState } from 'react';
import { fetchCampers } from '../../redux/campers/campersOps';
import CamperCard from '../../components/CamperCard/CamperCard';
import { selectFilteredTrucks } from '../../redux/filters/filtersSlice';

export default function CampersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const campers = useSelector(selectFilteredTrucks);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const visibleCampers = campers.slice(0, page * itemsPerPage);
  const hasMore = visibleCampers.length < campers.length;

  function handleLoadMore() {
    setPage(prevPage => prevPage + 1);
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {visibleCampers.length > 0 &&
          visibleCampers.map(camper => {
            return <CamperCard camper={camper} key={camper.id} />;
          })}
      </ul>
      {hasMore && (
        <button type="button" onClick={handleLoadMore} className={css['show-more-btn']}>
          Load More
        </button>
      )}
    </div>
  );
}

//add loading +suspense+outlet etc
