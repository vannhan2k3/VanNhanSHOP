import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import InputField from '../InputField';
import InputFieldPassword from '../inputFieldPassword';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

LoginForm.propTypes = {};

function LoginForm({ onSubmit, onOpen }) {
  const schema = yup
    .object({
      identifier: yup.string().required('lam on nhap email m').email('nhap dung email di then ngu'),
      password: yup.string().required('lam on nhap password di ong noi').min(6, 'nhapp hoi ngan do'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    onSubmit(value);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField name="identifier" label="Email" form={form} />
      <InputFieldPassword name="password" label="password" form={form} />
      <div class="wrap-btn">
        <button type="submit" className="signin">
          Sign In
        </button>
      </div>
      <span className="forgot">forgot password?</span>
    </form>
  );
}

export default LoginForm;
