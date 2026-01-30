import { Field } from 'formik';
import css from './FilterCard.module.css';

export default function FilterCard({
  feature: { value, icon, label },
  name,
  type,
}) {
  return (
    <div className={css['filter-container']}>
      <Field type={type} name={name} id={label} value={value} className={css['filter-input']} />
      <label htmlFor={label} className={css['label-container']}>
        <svg width="32" height="32">
          <use href={`/icons.svg#${icon}`} />
        </svg>
        <p>{label}</p>
      </label>
    </div>
  );
}
