import { useSelector } from 'react-redux';
import css from './CamperFeatures.module.css';
import { selectCamper } from '../../redux/campers/campersSlice';
import CamperBadge from '../CamperBadge/CamperBadge';
import Loader from '../Loader/Loader';

function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function CamperInfo() {
  const camper = useSelector(selectCamper);
  if (!camper) return <Loader />;

  return (
    <div className={css.container}>
      <div>
        <CamperBadge camper={camper} />
      </div>
      <div className={css['wrap']}>
        <h3>Vehicle details</h3>
        <div className={css['details-wrap']}>
          <div className={css['detail']}>
            <p>Form</p>
            <p>{capitalizeFirstLetter(camper.form)}</p>
          </div>
          <div className={css['detail']}>
            <p>Length</p>
            <p>{camper.length}</p>
          </div>
          <div className={css['detail']}>
            <p>Width</p>
            <p>{camper.width}</p>
          </div>
          <div className={css['detail']}>
            <p>Height</p>
            <p>{camper.height}</p>
          </div>
          <div className={css['detail']}>
            <p>Tank</p>
            <p>{camper.tank}</p>
          </div>
          <div className={css['detail']}>
            <p>Consumption</p>
            <p>{camper.consumption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
