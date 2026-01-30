import css from './CamperCard.module.css';
import CamperFeatures from '../CamperFeatures/CamperFeatures';
import Button from '../Button/Button';

export default function CamperCard({ camper }) {
  const { id, name, price, rating, reviews, location, description, gallery } =
    camper;

  return (
    <li className={css.container}>
      <div className={css['img-container']}>
        {gallery?.[0]?.thumb && <img src={gallery[0].thumb} alt={name} />}
      </div>
      <div>
        <div className={css.header}>
          <h2>{name}</h2>
          <p>€{price.toFixed(2)}</p>
          <svg width="26" height="24">
            <use href="/icons.svg#icon-heart" />
          </svg>
        </div>
        <div className={css['rating-location']}>
          <div className={css.rating}>
            <svg width="16" height="16">
              <use href="/icons.svg#icon-star-selected" />
            </svg>
            <p>
              {rating} ({reviews.length} Reviews)
            </p>
          </div>
          <div className={css.location}>
            <svg width="16" height="16">
              <use href="/icons.svg#icon-map" />
            </svg>
            <p>{location}</p>
          </div>
        </div>
        <div className={css.description}>
          <p>{description}</p>
        </div>
        <CamperFeatures camper={camper} />
        <Button to={`/catalog/${id}`} text="Show More" />
      </div>
    </li>
  );
}

// star fill in css ??? 
