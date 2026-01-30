import { Field } from 'formik';
import css from './FilterCard.module.css';

export default function FilterCard({
  feature: { value, icon, label },
  name,
  type,
}) {
  return (
    <div>
      <label htmlFor={label}>
        <svg width="32" height="32">
          <use href={`/icons.svg#${icon}`} />
        </svg>
        <p>{label}</p>
      </label>
      <Field type={type} name={name} id={label} value={value} />
    </div>
  );
}
