import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import iPhone14 from '../../../../assets/iPhone 14.jpg';
import aosominu from '../../../../assets/aosominu.jpg';
import khautrang from '../../../../assets/khautrang.jpg';
import skincare from '../../../../assets/skincare.jpg';
import ocung from '../../../../assets/ocung.jpg';
import laptop from '../../../../assets/laptop.jpg';
import iphone from '../../../../assets/iphone12.jpg';
import './style.scss';
import { STATIC_HOT, THUMBNAIL_PACEHOODER, formatPrice } from '../../../../constants/common';
import { useNavigate } from 'react-router-dom';
import ProductDetail from '../ProductDetail';

ItemProduct.propTypes = {};

function ItemProduct({ product }) {
  const imageUrl = useRef();
  const navigation = useNavigate();
  const handleOnClick = () => {
    navigation(`/${product.id}`);
  };
  // const imageUrl =
  //   product.thumbnail && product.thumbnail?.url ? `${STATIC_HOT}${product.thumbnail?.url}` : THUMBNAIL_PACEHOODER;
  if (product?.thumbnail && product.thumbnail?.url) {
    imageUrl.current = `${STATIC_HOT}${product.thumbnail?.url}`;
  } else {
    switch (product?.category.id) {
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
    <div className="wrap-item-product" onClick={handleOnClick}>
      <div className="image">
        <img src={imageUrl.current} alt="" style={{ width: '100%', height: '100%' }} />
      </div>
      <div>
        <span className="title">{product.category.id === 6 ? 'Iphone 12' : product.name}</span>
        <span className="price">{formatPrice(product.salePrice)}</span>
      </div>
    </div>
  );
}

export default ItemProduct;
