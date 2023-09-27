import PropTypes from 'prop-types';
import './style.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../userSlice';
import dangxuat from '../../../../../src/assets/dangxuat.png';
import setting from '../../../../../src/assets/setting.png';
import info from '../../../../../src/assets/info.png';
import { useEffect, useRef } from 'react';
ModalVerb.propTypes = {};

function ModalVerb({ onClose, isOpen }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    const action = logout();
    dispatch(action);
    onClose();
  };
  const modalRef = useRef(null);

  // Xử lý sự kiện click ngoài modal
  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   }

  //   if (isOpen) {
  //     // Thêm sự kiện click vào document khi modal mở
  //     document.addEventListener('click', handleClickOutside);
  //   } else {
  //     // Loại bỏ sự kiện click khi modal đóng
  //     document.removeEventListener('click', handleClickOutside);
  //   }

  //   return () => {
  //     // Loại bỏ sự kiện khi component bị unmount
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [isOpen, onClose]);

  return (
    <div class="wrap-verb-login" ref={modalRef}>
      <div className="wrap-about">
        <img className="info" src={info} alt="" />
        <p className="about">about</p>
      </div>
      <div className="wrap-caidat">
        <img className="setting" src={setting} alt="" />
        <p className="caidat">setting</p>
      </div>
      <div className="wrap-dangxuat" onClick={() => handleLogOut()}>
        <img className="logout" src={dangxuat} alt="" />
        <p className="btn-logout">logout</p>
      </div>
    </div>
  );
}

export default ModalVerb;
