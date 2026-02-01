import css from './CamperBadge.module.css';
import { featuresData } from '../../data/featuresData';

export default function CamperBadge({ camper }) {
  return (
    <div className={css.container}>
      {featuresData.map(({ key, label, svg, value }) => {
        const isvAvailable = camper[key] === true || camper[key] === value;
        return isvAvailable ? (
          <div key={key} className={css['feature-container']}>
            <svg width="20" height="20">
              <use href={`/icons.svg#${svg}`} />
            </svg>
            <p>{label}</p>
          </div>
        ) : null;
      })}
    </div>
  );
}
