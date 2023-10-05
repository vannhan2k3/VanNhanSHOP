import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputField from '../InputField';
import InputFieldPassword from '../inputFieldPassword';
RegisterForm.propTypes = {};

function RegisterForm({ onSubmit }) {
  const schema = yup
    .object({
      email: yup.string().required('lam on nhap email m').email('nhap dung email di then ngu'),
      password: yup.string().required('lam on nhap password di ong noi').min(6, 'password hoi ngan do'),
      fullName: yup.string().required('nhap het di mi'),
    })
    .required();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (value) => {
    if (onSubmit) {
      onSubmit(value);
    }
    form.reset();
  };
  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}
    >
      <InputField name="email" label="Email" form={form} />
      <InputFieldPassword name="password" label="password" form={form} />
      <InputField name="fullName" label="fullName" form={form} />
      <button type="submit" className="signin">
        register
      </button>
    </form>
  );
}

export default RegisterForm;
