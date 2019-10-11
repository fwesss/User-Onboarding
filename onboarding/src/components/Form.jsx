import React from 'react';
import { withFormik, Form, Field } from 'formik';


const LoginForm = () => (
  <section className="section">
    <div className="container columns is-centered">

      <Form className="column is-4">
        <div className="field">
          <div className="control">
            <Field className="input" type="text" name="name" placeholder="Name" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <Field className="input" type="email" name="email" placeholder="Email" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <Field className="input" type="password" name="password" placeholder="password" />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox" htmlFor="tos">
              <Field type="checkbox" name="tos" />
              {' '}
              I agree to the
              {' '}
              <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">Submit</button>
          </div>
        </div>
      </Form>
    </div>
  </section>
);

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

  handleSubmit(values) {
    console.log(values);
  },
})(LoginForm);

export default FormikLoginForm;
