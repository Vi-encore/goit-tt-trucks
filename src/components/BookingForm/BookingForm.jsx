import DatePicker, { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale/en-GB';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  comment: Yup.string(),
  dateRange: Yup.object({
    start: Yup.date().nullable().required('Please select a start date'),
    end: Yup.date().nullable().required('Please select an end date'),
  }),
});

const initialValues = {
  name: '',
  email: '',
  dateRange: { start: null, end: null },
  comment: '',
};

registerLocale('en-GB', enGB);

async function handleSubmit(values, { resetForm }) {
  toast.loading('Sending...');
  const formData = new FormData();
  formData.append('access_key', ACCESS_TOKEN);
  formData.append('name', values.name);
  formData.append('email', values.email);
  formData.append('message', values.comment || 'No comment provided');
  formData.append('start_date', values.dateRange.start);
  formData.append('end_date', values.dateRange.end);

  try {
    const res = await axios.post('https://api.web3forms.com/submit', formData);
    toast.dismiss();
    toast.success('Form Submitted Successfully');
    return res;
  } catch (e) {
    toast.dismiss();
    toast.error(`Error: ${e.message}`);
  } finally {
    resetForm();
  }
}

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function BookingForm() {
  return (
    <div className={css.container}>
      <div className={css['header-wrap']}>
        <h3>Book your campervan now</h3>
        <p>Stay connected! We are always ready to help you.</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => {
          return (
            <Form className={css['form-wrap']}>
              <div className={css['form-item-wrap']}>
                <Field
                  placeholder="Name*"
                  id="name"
                  name="name"
                  type="text"
                  className={
                    touched.name && errors.name
                      ? `${css['form-item']} ${css['required-border']}`
                      : css['form-item']
                  }
                />
                {touched.name && errors.name && (
                  <div className={css.required}>{errors.name}</div>
                )}
              </div>
              <div className={css['form-item-wrap']}>
                <Field
                  placeholder="Email*"
                  id="email"
                  name="email"
                  type="email"
                  className={
                    touched.email && errors.email
                      ? `${css['form-item']} ${css['required-border']}`
                      : css['form-item']
                  }
                />
                {touched.email && errors.email && (
                  <div className={css.required}>{errors.email}</div>
                )}
              </div>
              <div className={css['form-item-wrap']}>
                <DatePicker
                  id="dataRange"
                  startDate={values.dateRange?.start}
                  endDate={values.dateRange?.end}
                  onChange={dates => {
                    const [start, end] = dates;
                    setFieldValue('dateRange', { start, end });
                  }}
                  autoComplete="false"
                  selectsRange
                  minDate={new Date()}
                  locale="en-GB"
                  dateFormat="d MMMM, yyyy"
                  placeholderText="Booking date*"
                  closeOnScroll={true}
                  calendarClassName={css.customRoot}
                  className={
                    touched.dateRange &&
                    (errors.dateRange?.start || errors.dateRange?.end)
                      ? `${css['form-item']} ${css['required-border']}`
                      : css['form-item']
                  }
                  wrapperClassName={css.fullWidth}
                />
                {touched.dateRange?.start && errors.dateRange?.start && (
                  <div className={css.required}>{errors.dateRange.start}</div>
                )}
                {touched.dateRange?.end && errors.dateRange?.end && (
                  <div className={css.required}>{errors.dateRange.end}</div>
                )}
              </div>
              <div className={css['form-item-wrap']}>
                <Field
                  as="textarea"
                  placeholder="Comment"
                  type="text"
                  id="comment"
                  name="comment"
                  className={css['form-item']}
                />
              </div>
              <Button type="submit" text="Send" />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
