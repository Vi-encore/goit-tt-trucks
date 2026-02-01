import { useDispatch, useSelector } from 'react-redux';
import css from './CamperPage.module.css';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCamperById } from '../../redux/campers/campersOps';
import { clearCamper, selectCamper } from '../../redux/campers/campersSlice';
import BookingForm from '../../components/BookingForm/BookingForm';
import Loader from '../../components/Loader/Loader';
import ImageWithLoader from '../../components/ImageWithLoader/imageWithLoader';

const navLinks = [
  {
    label: 'Features',
    to: 'features',
  },
  {
    label: 'Reviews',
    to: 'reviews',
  },
];

export default function CamperPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCamperById(id));

    return () => dispatch(clearCamper());
  }, [dispatch, id]);

  const camper = useSelector(selectCamper);
  if (!camper) return <Loader />; // prevent errors by this

  const { name, rating, location, price, reviews, gallery, description } =
    camper;

  return (
    <div className={css.container}>
      <div className={css['main-info-container']}>
        <div className={css['info']}>
          <h2>{name}</h2>
          <div className={css['reviews-location-container']}>
            <div className={css['rl-wrap']}>
              <svg width="16" height="16">
                <use href="/icons.svg#icon-star-selected" />
              </svg>
              <p className={css['reviews-text']}>
                {rating}({reviews.length} Reviews)
              </p>
            </div>
            <div className={css['rl-wrap']}>
              <svg width="16" height="16">
                <use href="/icons.svg#icon-map" />
              </svg>
              <p>{location}</p>
            </div>
          </div>
          <h2>€{price.toFixed(2)}</h2>
        </div>
        <ul className={css['gallery-wrap']}>
          {gallery.map(image => {
            return (
              <li key={image.thumb} className={css['gallery-item']}>
                <ImageWithLoader src={image.thumb} alt={name} />
              </li>
            );
          })}
        </ul>
        <p className={css.description}>{description}</p>
      </div>
      <ul className={css['links-container']}>
        {navLinks.map(({ to, label }) => {
          return (
            <li key={label}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? `
              ${css.link} ${css.active}
            `
                    : css.link
                }
              >
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div className={css['info-form-container']}>
        <Outlet context={camper} />
        <BookingForm />
      </div>
    </div>
  );
}
