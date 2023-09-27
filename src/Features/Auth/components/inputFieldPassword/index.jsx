import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Controller } from 'react-hook-form';

InputFieldPassword.propTypes = {};

function InputFieldPassword({ name, label, form }) {
  const {
    formState: { errors },
  } = form;

  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => {
          return (
            <input
              {...field}
              className={`pass ${errors && errors.password ? 'errors' : ''}`}
              type="password"
              name="pass"
              id=""
              placeholder="pass"
            />
          );
        }}
      />
      {errors.password && <span className="mess-pass">{errors.password.message}</span>}
    </div>
  );
}

export default InputFieldPassword;
