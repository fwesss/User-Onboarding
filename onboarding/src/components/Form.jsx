import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const LoginForm = ({
  addUser, errors, isValid, touched, userList, values, resetForm,
}) => {
  const [modalActive, setModalActive] = useState('');
  const [checked, setChecked] = useState(false);

  const submit = useCallback(() => {
    if (isValid) {
      axios
        .post('https://reqres.in/api/users', values)
        .then((result) => addUser([...userList, result.data]))
        .catch((error) => {
          console.log(error);
        });
      resetForm({
        name: '',
        email: '',
        password: '',
        tos: false,
      });
      setChecked(false);
    } else {
      setModalActive('is-active');
    }
  }, [addUser, isValid, resetForm, userList, values]);

  return (
    <section className="section">
      <div className="columns is-centered">
        <div className={`modal ${modalActive}`}>
          <div className="modal-background" />
          <div className="modal-content">
            <article className="message is-danger">
              <div className="message-header">
                <p>Form Errors</p>
                <button
                  className="delete"
                  type="button"
                  aria-label="close"
                  onClick={() => (setModalActive(''))}
                />
              </div>
              <div className="message-body">
                <ul>
                  {touched.name && errors.name && <li>{errors.name}</li>}
                  {touched.email && errors.email && <li>{errors.email}</li>}
                  {touched.password && errors.password && <li>{errors.password}</li>}
                  {touched.tos && errors.tos && <li>{errors.tos}</li>}
                </ul>
              </div>
            </article>
          </div>
        </div>

        <Form className="column is-3">
          <div className="field">
            <div className="control">
              <Field
                className="input"
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="on"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <Field
                className="input"
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="on"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <Field
                className="input"
                type="password"
                name="password"
                placeholder="password"
                autoComplete="on"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <label
                className="checkbox"
                htmlFor="tos"
              >
                <Field
                  type="checkbox"
                  name="tos"
                  checked={checked}
                  onClick={() => (setChecked(!checked))}
                />
                {' '}
                I agree to the
                {' '}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button
                className="button is-primary"
                type="submit"
                onClick={submit}
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues({
    name, email, password, tos,
  }) {
    return {
      name: name || '',
      email: email || '',
      password: password || '',
      tos: tos || false,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .matches(/[a-z\s]/gi, 'Name must have only letters')
      .required('Name is required'),
    email: Yup.string()
      .email('Email must be valid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    tos: Yup.bool()
      .oneOf([true], 'You must agree to our terms and conditions before signing up'),
  }),

  handleSubmit() {},
})(LoginForm);

LoginForm.propTypes = {
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    tos: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    name: PropTypes.bool,
    email: PropTypes.bool,
    password: PropTypes.bool,
    tos: PropTypes.bool,
  }).isRequired,
  addUser: PropTypes.func.isRequired,
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  ).isRequired,
  values: PropTypes.shape().isRequired,
  resetForm: PropTypes.func.isRequired,
};

export default FormikLoginForm;
