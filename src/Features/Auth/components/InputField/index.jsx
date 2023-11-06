import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { Controller } from 'react-hook-form';

InputField.propTypes = {};

function InputField({ form, label, name }) {
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
              className={`email ${errors && errors[name] ? 'error' : ''}`}
              type="text"
              name={name}
              id=""
              placeholder={label}
            />
          );
        }}
      />
      {errors[name] && <span className="mess-email"> {errors[name].message}</span>}
    </div>
  );
}

export default InputField;
