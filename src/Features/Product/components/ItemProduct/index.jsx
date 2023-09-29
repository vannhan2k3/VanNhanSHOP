import React from 'react';
import PropTypes from 'prop-types';
import iPhone14 from '../../../../assets/iPhone 14.jpg';
import './style.scss';
import { STATIC_HOT, THUMBNAIL_PACEHOODER } from '../../../../constants/common';
import { useNavigate } from 'react-router-dom';
import ProductDetail from '../ProductDetail';

ItemProduct.propTypes = {};

function ItemProduct({ product }) {
  const navigation = useNavigate();
  const handleOnClick = () => {
    navigation(`/${product.id}`);
  };
  const imageUrl =
    product.thumbnail && product.thumbnail?.url ? `${STATIC_HOT}${product.thumbnail?.url}` : THUMBNAIL_PACEHOODER;
  return (
    <div className="wrap-item-product" onClick={handleOnClick}>
      <div className="image">
        <img src={imageUrl} alt="" style={{ width: '100%', height: '100%' }} />
      </div>
      <div>
        <span className="title">{product.name}</span>
        <span className="price">{product.salePrice} vnd</span>
      </div>
    </div>
  );
}

export default ItemProduct;
