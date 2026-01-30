import { useDispatch, useSelector } from 'react-redux';
import css from './CampersList.module.css';
import { useEffect } from 'react';
import { fetchCampers } from '../../redux/campers/campersOps';
import CamperCard from '../../components/CamperCard/CamperCard';
import { selectFilteredTrucks } from '../../redux/filters/filtersSlice';

export default function CampersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const campers = useSelector(selectFilteredTrucks);

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {campers.length > 0 &&
          campers.map(camper => {
            return <CamperCard camper={camper} key={camper.id} />;
          })}
      </ul>
    </div>
  );
}

//add show more btn
