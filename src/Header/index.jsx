import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../src/assets/logo.png';
import search from '../../src/assets/search.png';
import vannhan from '../../src/assets/vannhan.jpg';
import Login from '../Features/Auth/components/Login';
import ModalVerb from '../Features/Auth/components/ModalVerb';
import cart from '../assets/shopping-cart.png';
import person from '../assets/person.png';
import './style.scss';
import ModalSearch from '../components/ModalSearch';
import { useEffect } from 'react';
import { itemCartCountSelector, itemCartTotalSelector } from '../Features/Cart/selector';
import ModalCart from '../components/ModalCart';
import { hideMinicart, showMiniCart } from '../Features/Cart/cartSlice';
Header.propTypes = {};

function Header(props) {
  const [openLogin, setOpenLogin] = useState(false);
  const [openModalVerb, setOpenModalVerb] = useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const navigation = useNavigate();
  const modalRef = useRef(null);

  const current = useSelector((state) => state.user.current);
  ///////////////////////tinh so luong sp/////
  const countProduct = useSelector(itemCartCountSelector);

  const showCart = useSelector((state) => state.cart.showCart);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
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
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenModalSearch(false);
        dispatch(hideMinicart());
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOnchangeSearch = (e) => {
    setSearchItem(e.target.value);
  };
  const handleResetInput = () => {
    setSearchItem('');
  };

  const handleCloseModalSearch = () => {
    setOpenModalSearch(false);
  };

  useEffect(() => {
    setQuantity(countProduct);
  }, [countProduct]);
  return (
    <div className="container">
      <div className="header">
        <div className="logo-menu" onClick={() => navigation('/')}>
          <img className="img-list" src={logo} alt="" />
          {/* <h2 className="shop-card">SHOP CART</h2> */}
        </div>
        <div className="tim-kiem">
          <input
            className="input-timkiem"
            type="text"
            value={searchItem}
            placeholder="Tìm Kiếm Sản Phẩm"
            onChange={(e) => handleOnchangeSearch(e)}
            onClick={() => setOpenModalSearch(true)}
          />
          {openModalSearch && (
            <ModalSearch
              modalRef={modalRef}
              searchItem={searchItem}
              onResetInput={handleResetInput}
              handleCloseModalSearch={handleCloseModalSearch}
            />
          )}
          {/* <img className="search" src={search} alt="" /> */}
        </div>
        <div className="logo-login">
          <div className="cart" onClick={() => dispatch(showMiniCart())}>
            <img className="img-cart" src={cart} alt="" style={{ width: '30px', height: '30px' }} />
            <span className="count">{quantity}</span>
            {showCart && <ModalCart modalRef={modalRef} />}
          </div>
          {isLogin ? (
            <div className="logo-name">
              <span className="current"> {current.fullName}</span>
              <img className="vannhan" src={person} alt="" onClick={toggleModalVerb} />
              {openModalVerb && <ModalVerb onClose={closeToggle} isOpen={openModalVerb} />}
            </div>
          ) : (
            <span
              className="span-1"
              onClick={() => handleOpenLogin()}
              style={{ fontSize: '18px', cursor: 'pointer', color: 'white' }}
            >
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
