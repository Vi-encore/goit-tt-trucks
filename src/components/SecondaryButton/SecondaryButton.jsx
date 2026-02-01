import css from './SecondaryButton.module.css';

export default function SecondaryButton({ text, onClick, ref = '' }) {
  return ref === '' ? (
    <button type="button" onClick={onClick} className={css.btn}>
      {text}
    </button>
  ) : (
    <button ref={ref} type="button" onClick={onClick} className={css.btn}>
      {text}
    </button>
  );
}
