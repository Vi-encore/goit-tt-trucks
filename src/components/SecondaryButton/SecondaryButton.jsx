import css from './SecondaryButton.module.css';

export default function SecondaryButton({ text, onClick, ref }) {
  if (ref)
    return (
      <button ref={ref} type="button" onClick={onClick} className={css.btn}>
        {text}
      </button>
    );

  return (
    <button type="button" onClick={onClick} className={css.btn}>
      {text}
    </button>
  );
}
