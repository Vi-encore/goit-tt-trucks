import Button from '../../components/Button/Button';
import css from './NotFoundPage.module.css';

export default function NotFoundPage({ text = 'Sorry! Page is not found!' }) {
  return (
    <div className={css.container}>
      <h2>{text}</h2>
      <Button to={'/'} text="Go to Homepage" />
    </div>
  );
}
