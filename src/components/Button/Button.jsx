import css from './Button.module.css';
import { Link } from 'react-router-dom';

export default function Button({ onClick, text, to }) {
  if (to) {
    return (
      <Link to={to} className={css.button}>
        {text}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={css.button}>
      {text}
    </button>
  );
}
