import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../src/assets/logo.png';
import search from '../../src/assets/search.png';
import vannhan from '../../src/assets/vannhan.jpg';
import Login from '../Features/Auth/components/Login';
import ModalVerb from '../Features/Auth/components/ModalVerb';
import './style.scss';
Header.propTypes = {};

function Header(props) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openModalVerb, setOpenModalVerb] = useState(false);
  const navigation = useNavigate();

  const current = useSelector((state) => state.user.current);
  const isLogin = !!current.id;

  const handleOpenLogin = () => {
    setOpenLogin(!openLogin);
  };
  const handleSignIn = () => {
    handleOpenLogin();
  };
  //hàm sử lý ẩn hiện
  const toggleModalVerb = () => {
    setOpenModalVerb(!openModalVerb);
  };

  const closeToggle = () => {
    setOpenModalVerb(false);
  };
  console.log('modal ', openModalVerb);
  return (
    <div className="container">
      <div className="header">
        <div className="logo-menu" onClick={() => navigation('/')}>
          <img className="img-list" src={logo} alt="" />
          {/* <h2 className="shop-card">SHOP CART</h2> */}
        </div>
        <div className="tim-kiem">
          <input className="input-timkiem" type="text" placeholder="Tìm Kiếm Sản Phẩm" />
          <img className="search" src={search} alt="" />
        </div>
        <div className="logo-login">
          {isLogin ? (
            <div className="logo-name">
              <span className="current"> {current.fullName}</span>
              <img className="vannhan" src={vannhan} alt="" onClick={toggleModalVerb} />
              {openModalVerb && <ModalVerb onClose={closeToggle} isOpen={openModalVerb} />}
            </div>
          ) : (
            <span className="span-1" onClick={() => handleOpenLogin()} style={{ fontSize: '20px', cursor: 'pointer' }}>
              Login
            </span>
          )}
        </div>
      </div>
      {/* <div className="main">
        <div className="background">
          <img src={nềnShop} alt="" />
        </div>
      </div> */}
      {openLogin && !isLogin && <Login onOpen={handleOpenLogin} onSignIn={handleSignIn} />}
    </div>
  );
}

export default Header;
