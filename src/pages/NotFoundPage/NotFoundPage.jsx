import Button from '../../components/Button/Button';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h2>Sorry! Page is not found!</h2>
      <Button to={'/'} text="Go to Homepage" />
    </div>
  );
}
