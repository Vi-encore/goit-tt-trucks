import Button from '../../components/Button/Button';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={css['main-container']}>
      <h1 className={css.header}>Campers of your dreams</h1>
      <h2 className={css.subheader}>You can find everything you want in our catalog</h2>
      <Button to="/catalog" text="View Now" />
    </main>
  );
}
