import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { STATIC_HOT, THUMBNAIL_PACEHOODER } from '../../constants/common';
import './style.scss';
import aosominu from '../../assets/aosominu.jpg';
import khautrang from '../../assets/khautrang.jpg';
import skincare from '../../assets/skincare.jpg';
import ocung from '../../assets/ocung.jpg';
import laptop from '../../assets/laptop.jpg';
import iphone from '../../assets/iphone12.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemCart } from '../../Features/Cart/cartSlice';
import { useNavigate } from 'react-router-dom';

ModalCart.propTypes = {};

function ModalCart({ modalRef }) {
  const itemCart = useSelector((state) => state.cart.itemCart);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const imageUrl = useRef();
  const handleDelete = (id) => {
    dispatch(removeItemCart(id));
  };
  return (
    <div class="header__cart-list" ref={modalRef}>
      <img src="" alt="" class="header__cart--no-cart-img" />
      <span class="header__cart-list-mgs">Chưa có sản phẩm</span>
      <div class="header__cart-view-cart">
        <h3 class="header__cart-heading">Sản phẩm bạn đã chọn mua</h3>
        <ul class="header__cart-list-item">
          {itemCart.map((item, index) => {
            if (item.product?.thumbnail && item.product?.thumbnail?.url) {
              imageUrl.current = `${STATIC_HOT}${item.product?.thumbnail?.url}`;
            } else {
              switch (item.product?.category.id) {
                case 1:
                  imageUrl.current = aosominu;
                  break;
                case 2:
                  imageUrl.current = khautrang;
                  break;
                case 3:
                  imageUrl.current = skincare;
                  break;
                case 4:
                  imageUrl.current = laptop;
                  break;
                case 5:
                  imageUrl.current = ocung;
                  break;
                case 6:
                  imageUrl.current = iphone;
                  break;
                default:
                  imageUrl.current = THUMBNAIL_PACEHOODER;
                  break;
              }
            }
            return (
              <li class="header__cart-item">
                <img class="header__cart-item-img" src={imageUrl.current} alt="" />
                <div class="header__cart-item-info">
                  <div class="header__cart-item-head">
                    <h5 class="header__cart-item-name">{item.product?.name}</h5>
                    <div class="header__cart-item-price">
                      <span class="header__cart-item-money">{item.product?.salePrice}</span>
                      <span class="header__cart-item-multiply">x</span>
                      <span class="header__cart-item-qnt">{item.quantity}</span>
                    </div>
                  </div>
                  <div class="header__cart-item-body">
                    <span class="header__cart-item-description">Phân loại: đen</span>
                    <span class="header__cart-item-remove" onClick={() => handleDelete(item.id)}>
                      Xóa
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <button class="header__cart-btn-view-cart btn btn--primary" onClick={() => navigation('/cart')}>
        Xem giỏ hàng
      </button>
    </div>
  );
}

export default ModalCart;
