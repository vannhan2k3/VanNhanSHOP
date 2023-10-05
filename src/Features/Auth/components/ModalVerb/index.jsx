import PropTypes from 'prop-types';
import './style.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../userSlice';
import dangxuat from '../../../../../src/assets/dangxuat.png';
import setting from '../../../../../src/assets/setting.png';
import info from '../../../../../src/assets/info.png';
import acount from '../../../../assets/user.png';
import address from '../../../../assets/address.png';
import logoutIcon from '../../../../assets/logout.png';
import shoppingCart from '../../../../assets/shopping-bag.png';

import { useEffect, useRef } from 'react';
ModalVerb.propTypes = {};

function ModalVerb({ onClose, isOpen }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    const action = logout();
    dispatch(action);
    onClose();
  };
  const modalRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div class="wrap-verb-login" ref={modalRef}>
      <ul class="header__navbar-user-menu">
        <li class="header__navbar-user-item">
          <a href="/acount">
            <img src={acount} style={{ width: '15px', height: '15px', marginRight: '8px' }} alt="" /> Tài khoản
          </a>
        </li>
        <li class="header__navbar-user-item">
          <a href="/address">
            <img src={address} style={{ width: '15px', height: '15px', marginRight: '8px' }} alt="" />
            Địa chỉ
          </a>
        </li>
        <li class="header__navbar-user-item">
          <a href="/buy">
            <img src={shoppingCart} style={{ width: '15px', height: '15px', marginRight: '8px' }} alt="" />
            Đơn mua
          </a>
        </li>
        <li class="header__navbar-user-item header__navbar-user-item--saparate">
          <span onClick={() => handleLogOut()}>
            <img src={logoutIcon} style={{ width: '15px', height: '15px', marginRight: '8px' }} alt="" />
            Đăng xuất
          </span>
        </li>
      </ul>
    </div>
  );
}

export default ModalVerb;
