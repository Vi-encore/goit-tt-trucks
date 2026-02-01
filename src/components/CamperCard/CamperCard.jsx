import css from './CamperCard.module.css';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFavorites,
  toggleFavorite,
} from '../../redux/favorites/favoritesSlice';
import CamperBadge from '../CamperBadge/CamperBadge';
import ImageWithLoader from '../ImageWithLoader/imageWithLoader';

export default function CamperCard({ camper }) {
  const { id, name, price, rating, reviews, location, description, gallery } =
    camper;

  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  function handleAddFavorite() {
    dispatch(toggleFavorite(id));
  }

  return (
    <li className={css.container}>
      <div className={css['img-container']}>
        {gallery?.[0]?.thumb && (
          <ImageWithLoader src={gallery[0].thumb} alt={name} />
        )}
      </div>
      <div>
        <div className={css.header}>
          <h2>{name}</h2>
          <p>€{price.toFixed(2)}</p>
          <button
            className={css['favorites-btn']}
            onClick={handleAddFavorite}
            aria-pressed={favorites.includes(id)}
            aria-label={
              favorites.includes(id)
                ? 'Remove from favorites'
                : 'Add to favorites'
            }
          >
            <svg width="26" height="24" className={css['favorites-icon']}>
              {favorites.includes(id) ? (
                <use href="/icons.svg#icon-heart-selected" />
              ) : (
                <use href="/icons.svg#icon-heart" />
              )}
            </svg>
          </button>
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
        <CamperBadge camper={camper} />
        <Button to={`/catalog/${id}`} text="Show More" />
      </div>
    </li>
  );
}
