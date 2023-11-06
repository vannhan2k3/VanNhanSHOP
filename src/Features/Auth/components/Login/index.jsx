import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import hinhnenlacay from '../../../../assets/hinhnenlacay.jpg';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { login, register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

Login.propTypes = {};

function Login({ onOpen }) {
  const [mode, setMode] = useState('login');

  // tao dispatch cua redux
  const dispatch = useDispatch();

  const handleOnClick = () => {
    onOpen();
  };

  const handleSubmitRegister = async (value) => {
    value.username = value.email;
    const action = register(value);
    const resulAction = await dispatch(action);

    const user = unwrapResult(resulAction);
  };
  const handleSubmitLogin = async (value) => {
    const action = login(value);
    const resulAction = await dispatch(action);

    const user = unwrapResult(resulAction);
    if (user) {
      onOpen();
    }
  };
  return (
    <div>
      <div className="modal">
        <div className="modal-overlay"></div>
        <div className="modal-body">
          <div className="modal-body-header">
            <h2> Sign In </h2>
          </div>
          <div className="modal-content">
            <div class="wrap-login">
              <div class="img-login"></div>
              <div class="content-login">
                <h2>Wellcome !</h2>
                <div className="cancel" onClick={handleOnClick}></div>

                {mode === 'register' && (
                  <div>
                    <RegisterForm onSubmit={handleSubmitRegister} />
                    <span
                      className="login-now"
                      onClick={() => setMode('login')}
                      style={{ color: 'white', margin: '8px 0' }}
                    >
                      have account. login now
                    </span>
                  </div>
                )}
                {mode === 'login' && (
                  <div>
                    <LoginForm onSubmit={handleSubmitLogin} onOpen={onOpen} />
                    <span className="register-now" onClick={() => setMode('register')}>
                      don't have account. register now
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Login.propTypes = { onSignIn: PropTypes.func.isRequired }; // Hàm để cập nhật trạng thái khi đăng nhập thành công

export default Login;
