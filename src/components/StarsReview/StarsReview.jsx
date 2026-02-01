import css from './StarsReview.module.css';

export default function StarsReview({ rating }) {
  const totalStars = 5;
  return (
    <div className={css.container}>
      {Array.from({ length: totalStars }, (_, index) => {
        const starValue = index + 1;
        const isSelected = starValue <= rating;

        return (
          <svg width="16" height="16" key={starValue}>
            <use
              href={`/icons.svg#icon-star${isSelected ? '-selected' : ''}`}
            />
          </svg>
        );
      })}
    </div>
  );
}
