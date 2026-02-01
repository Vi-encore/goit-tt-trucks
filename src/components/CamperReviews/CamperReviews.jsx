import { useSelector } from 'react-redux';
import css from './CamperReviews.module.css';
import { selectCamper } from '../../redux/campers/campersSlice';
import StarsReview from '../StarsReview/StarsReview';
import Loader from '../Loader/Loader';

export default function CamperReviews() {
  const camper = useSelector(selectCamper);
  if (!camper) return <Loader />;

  const { reviews } = camper;

  return (
    <div className={css.container}>
      {reviews.map(review => {
        return (
          <div
            key={review.reviewer_name.charAt(0)}
            className={css['review-wrap']}
          >
            <div className={css['review-head']}>
              <div className={css['review-avatar']}>
                <span>{review.reviewer_name.charAt(0)}</span>
              </div>
              <div className={css['review-info']}>
                <h4>{review.reviewer_name}</h4>
                <StarsReview rating={review.reviewer_rating} />
              </div>
            </div>

            <p className={css['review-comment']}>{review.comment}</p>
          </div>
        );
      })}
    </div>
  );
}
