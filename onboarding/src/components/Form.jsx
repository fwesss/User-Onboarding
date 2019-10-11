import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';


const LoginForm = ({ isValid, errors, touched }) => {
  const [modalActive, setModalActive] = useState('');

  return (
    <section className="section">
      <div className="container columns is-centered">
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
                </ul>
              </div>
            </article>
          </div>
        </div>

        <Form className="column is-4">
          <div className="field">
            <div className="control">
              <Field
                className="input"
                type="text"
                name="name"
                placeholder="Name"
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
                />
                {' '}
                I agree to the
                {' '}
                <a href="#">terms and conditions</a>
              </label>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button
                className="button is-primary"
                type="submit"
                onClick={() => (!isValid ? setModalActive('is-active') : setModalActive(''))}
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
      .matches(/^[a-zA-Z]+$/, 'Name must have only letters')
      .required('Name is required'),
    email: Yup.string()
      .email('Email must be valid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  }),

  handleSubmit(values) {
    console.log(values);
  },
})(LoginForm);

export default FormikLoginForm;
