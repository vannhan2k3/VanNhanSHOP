import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../Banner';
import ProductList from './components/ProductList';
import ItemProduct from './components/ItemProduct';

Product.propTypes = {};

function Product(props) {
  return (
    <div style={{ width: '1200px', margin: 'auto' }}>
      <Banner />
      <ProductList />
    </div>
  );
}

export default Product;
